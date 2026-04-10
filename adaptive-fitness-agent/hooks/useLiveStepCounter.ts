import { useEffect, useMemo, useRef, useState } from "react";
import { PermissionsAndroid, Platform } from "react-native";
import { Pedometer } from "expo-sensors";
import {
  SdkAvailabilityStatus,
  getGrantedPermissions,
  getSdkStatus,
  initialize,
  readRecords,
  requestPermission,
} from "react-native-health-connect";

const STEPS_TO_KM_FACTOR = 0.0008;
const STEPS_TO_CALORIES_FACTOR = 0.04;
const HEALTH_CONNECT_POLL_INTERVAL_MS = 5000;
const FALLBACK_DAY_CHECK_INTERVAL_MS = 60000;
const MIN_HUMAN_CADENCE_SPM = 35;
const MAX_HUMAN_CADENCE_SPM = 210;
const MAX_STEPS_PER_SECOND = 3.2;
const MIN_CONFIDENT_STEPS = 6;

export const DAILY_STEP_GOAL = 10000;

export type LiveStepCounter = {
  stepsToday: number;
  goal: number;
  progress: number;
  remainingSteps: number;
  distanceKm: number;
  caloriesBurned: number;
  isAvailable: boolean;
  hasPermission: boolean;
  trackingSource: "health-connect" | "pedometer" | "none";
  isLoading: boolean;
  errorMessage: string | null;
};

function getDateKey(date = new Date()) {
  return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
}

function getMidnight(date = new Date()) {
  const midnight = new Date(date);
  midnight.setHours(0, 0, 0, 0);
  return midnight;
}

function getFriendlyStartErrorMessage(error: unknown) {
  const errorText = error instanceof Error ? error.message : String(error ?? "");

  if (/not available|unavailable|not supported/i.test(errorText)) {
    return "Step sensor is not available on this device.";
  }

  if (/permission|denied|authorize|authoriz/i.test(errorText)) {
    return "Motion permission is required for live step tracking.";
  }

  return "Unable to start live step tracking on this device.";
}

async function readHealthConnectStepsSinceMidnight() {
  const now = new Date();

  const records = await readRecords("Steps", {
    timeRangeFilter: {
      operator: "between",
      startTime: getMidnight(now).toISOString(),
      endTime: now.toISOString(),
    },
  });

  const totalSteps = records.records.reduce((sum, record) => sum + record.count, 0);

  return {
    dateKey: getDateKey(now),
    steps: totalSteps,
  };
}

function hasHealthConnectStepsReadPermission(
  permissions: Array<{ accessType: string; recordType: string }>,
) {
  const normalize = (value: string) => value.trim().toLowerCase();

  return permissions.some(
    (permission) => {
      const accessType = normalize(permission.accessType);
      const recordType = normalize(permission.recordType);

      return (
        accessType === "read" &&
        (recordType === "steps" || recordType.endsWith("read_steps"))
      );
    },
  );
}

async function requestMotionPermission() {
  if (Platform.OS === "android") {
    if (Platform.Version < 29) {
      return true;
    }

    const result = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACTIVITY_RECOGNITION,
      {
        title: "Activity permission",
        message: "Allow activity recognition to count your steps in real time.",
        buttonPositive: "Allow",
      },
    );

    return result === PermissionsAndroid.RESULTS.GRANTED;
  }

  if (Platform.OS === "ios") {
    const permissionResult = await Pedometer.requestPermissionsAsync();
    return permissionResult.granted || permissionResult.status === "granted";
  }

  return true;
}

export default function useLiveStepCounter(goal = DAILY_STEP_GOAL): LiveStepCounter {
  const [baselineSteps, setBaselineSteps] = useState(0);
  const [liveStepDelta, setLiveStepDelta] = useState(0);
  const [isAvailable, setIsAvailable] = useState(false);
  const [hasPermission, setHasPermission] = useState(false);
  const [trackingSource, setTrackingSource] = useState<
    "health-connect" | "pedometer" | "none"
  >("none");
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const currentDateRef = useRef(getDateKey());
  const lastRawPedometerStepsRef = useRef(0);
  const acceptedFilteredStepsRef = useRef(0);
  const movementConfidenceRef = useRef(0);
  const lastPedometerEventAtRef = useRef(0);

  useEffect(() => {
    let isMounted = true;
    let pedometerSubscription: { remove: () => void } | null = null;
    let dayCheckInterval: ReturnType<typeof setInterval> | null = null;
    let healthConnectPollInterval: ReturnType<typeof setInterval> | null = null;

    const resetPedometerFilter = () => {
      lastRawPedometerStepsRef.current = 0;
      acceptedFilteredStepsRef.current = 0;
      movementConfidenceRef.current = 0;
      lastPedometerEventAtRef.current = 0;
    };

    const applyPedometerAntiShakeFilter = (rawStepTotal: number) => {
      const nowMs = Date.now();
      const previousEventAtMs = lastPedometerEventAtRef.current;
      const previousRawTotal = lastRawPedometerStepsRef.current;

      if (previousEventAtMs === 0) {
        lastPedometerEventAtRef.current = nowMs;
        lastRawPedometerStepsRef.current = rawStepTotal;
        return;
      }

      const elapsedSeconds = Math.max(0.25, (nowMs - previousEventAtMs) / 1000);
      const rawDelta = Math.max(0, rawStepTotal - previousRawTotal);

      lastPedometerEventAtRef.current = nowMs;
      lastRawPedometerStepsRef.current = rawStepTotal;

      if (elapsedSeconds > 6) {
        movementConfidenceRef.current = Math.max(0, movementConfidenceRef.current - 4);
      }

      if (rawDelta === 0) {
        return;
      }

      const cadenceSpm = (rawDelta / elapsedSeconds) * 60;
      const stepsPerSecond = rawDelta / elapsedSeconds;
      const plausibleCadence =
        cadenceSpm >= MIN_HUMAN_CADENCE_SPM && cadenceSpm <= MAX_HUMAN_CADENCE_SPM;
      const plausibleBurst = stepsPerSecond <= MAX_STEPS_PER_SECOND;

      if (!plausibleCadence || !plausibleBurst) {
        movementConfidenceRef.current = Math.max(0, movementConfidenceRef.current - 2);
        return;
      }

      movementConfidenceRef.current = Math.min(
        MIN_CONFIDENT_STEPS * 2,
        movementConfidenceRef.current + rawDelta,
      );

      if (movementConfidenceRef.current < MIN_CONFIDENT_STEPS) {
        return;
      }

      acceptedFilteredStepsRef.current += rawDelta;
      setLiveStepDelta(acceptedFilteredStepsRef.current);
    };

    const syncTodayStepBaseline = async () => {
      const now = new Date();
      const today = await Pedometer.getStepCountAsync(getMidnight(now), now);

      if (!isMounted) {
        return;
      }

      currentDateRef.current = getDateKey(now);
      setBaselineSteps(today.steps);
      setLiveStepDelta(0);
    };

    const syncTodayHealthConnectBaseline = async () => {
      const result = await readHealthConnectStepsSinceMidnight();

      if (!isMounted) {
        return;
      }

      currentDateRef.current = result.dateKey;
      setBaselineSteps(result.steps);
      setLiveStepDelta(0);
    };

    const startHealthConnectCounter = async () => {
      if (Platform.OS !== "android") {
        return false;
      }

      try {
        const sdkStatus = await getSdkStatus();

        if (!isMounted) {
          return false;
        }

        if (sdkStatus !== SdkAvailabilityStatus.SDK_AVAILABLE) {
          if (
            sdkStatus ===
            SdkAvailabilityStatus.SDK_UNAVAILABLE_PROVIDER_UPDATE_REQUIRED
          ) {
            setErrorMessage(
              "Health Connect needs an update. Using on-device sensor fallback.",
            );
          } else {
            setErrorMessage(
              "Health Connect is not available on this device. Using on-device sensor fallback.",
            );
          }

          return false;
        }

        const initialized = await initialize();

        if (!initialized || !isMounted) {
          return false;
        }

        const currentGrantedPermissions = (await getGrantedPermissions()).map(
          (permission) => ({
            accessType: permission.accessType,
            recordType: permission.recordType,
          }),
        );

        let hasReadStepsPermission = hasHealthConnectStepsReadPermission(
          currentGrantedPermissions,
        );

        if (!hasReadStepsPermission) {
          const requestedPermissions = (await requestPermission([
            { accessType: "read", recordType: "Steps" },
          ])).map((permission) => ({
            accessType: permission.accessType,
            recordType: permission.recordType,
          }));

          hasReadStepsPermission = hasHealthConnectStepsReadPermission(
            requestedPermissions,
          );
        }

        if (!hasReadStepsPermission) {
          hasReadStepsPermission = hasHealthConnectStepsReadPermission(
          (await getGrantedPermissions()).map((permission) => ({
            accessType: permission.accessType,
            recordType: permission.recordType,
          })),
          );
        }

        if (!isMounted) {
          return false;
        }

        if (!hasReadStepsPermission) {
          setErrorMessage(
            "Health Connect permission was denied. Enable Steps permission in Health Connect, then reopen the app. Using on-device sensor fallback.",
          );
          return false;
        }

        setIsAvailable(true);
        setHasPermission(true);
        setTrackingSource("health-connect");
        setErrorMessage(null);

        await syncTodayHealthConnectBaseline();

        if (!isMounted) {
          return true;
        }

        healthConnectPollInterval = setInterval(() => {
          syncTodayHealthConnectBaseline().catch(() => {
            if (!isMounted) {
              return;
            }

            setErrorMessage(
              "Health Connect is enabled but daily step sync failed. Retrying...",
            );
          });
        }, HEALTH_CONNECT_POLL_INTERVAL_MS);

        return true;
      } catch (error) {
        if (!isMounted) {
          return false;
        }

        setErrorMessage(
          "Health Connect is unavailable right now. Using on-device sensor fallback.",
        );
        return false;
      }
    };

    const startPedometerFallbackCounter = async () => {
      const available = await Pedometer.isAvailableAsync();

      if (!isMounted) {
        return;
      }

      setIsAvailable(available);
      setTrackingSource("pedometer");

      if (!available) {
        setHasPermission(false);
        setTrackingSource("none");
        setErrorMessage("Step counting is not available on this device.");
        return;
      }

      const granted = await requestMotionPermission();

      if (!isMounted) {
        return;
      }

      setHasPermission(granted);

      if (!granted) {
        setTrackingSource("none");
        setErrorMessage("Motion permission is required for live step tracking.");
        return;
      }

      try {
        await syncTodayStepBaseline();
      } catch {
        if (!isMounted) {
          return;
        }

        // Some devices cannot provide historical step count but can stream live steps.
        setBaselineSteps(0);
        setLiveStepDelta(0);
      }

      if (!isMounted) {
        return;
      }

      resetPedometerFilter();

      pedometerSubscription = Pedometer.watchStepCount((result) => {
        applyPedometerAntiShakeFilter(result.steps);
      });

      dayCheckInterval = setInterval(() => {
        if (currentDateRef.current !== getDateKey()) {
          syncTodayStepBaseline()
            .then(() => {
              if (!isMounted) {
                return;
              }

              resetPedometerFilter();
            })
            .catch(() => {
              if (!isMounted) {
                return;
              }

              setErrorMessage("Could not refresh daily steps right now.");
            });
        }
      }, FALLBACK_DAY_CHECK_INTERVAL_MS);
    };

    const startCounter = async () => {
      setIsLoading(true);
      setErrorMessage(null);

      try {
        const isHealthConnectActive = await startHealthConnectCounter();

        if (!isMounted || isHealthConnectActive) {
          return;
        }

        await startPedometerFallbackCounter();
      } catch (error) {
        if (!isMounted) {
          return;
        }

        setErrorMessage(getFriendlyStartErrorMessage(error));
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    startCounter().catch((error) => {
      if (isMounted) {
        setIsLoading(false);
        setErrorMessage(getFriendlyStartErrorMessage(error));
      }
    });

    return () => {
      isMounted = false;
      pedometerSubscription?.remove();

      if (dayCheckInterval) {
        clearInterval(dayCheckInterval);
      }

      if (healthConnectPollInterval) {
        clearInterval(healthConnectPollInterval);
      }
    };
  }, []);

  return useMemo(() => {
    const stepsToday = Math.max(0, baselineSteps + liveStepDelta);
    const progress = Math.min(1, stepsToday / goal);

    return {
      stepsToday,
      goal,
      progress,
      remainingSteps: Math.max(0, goal - stepsToday),
      distanceKm: Number((stepsToday * STEPS_TO_KM_FACTOR).toFixed(2)),
      caloriesBurned: Math.round(stepsToday * STEPS_TO_CALORIES_FACTOR),
      isAvailable,
      hasPermission,
      trackingSource,
      isLoading,
      errorMessage,
    };
  }, [
    baselineSteps,
    liveStepDelta,
    goal,
    isAvailable,
    hasPermission,
    trackingSource,
    isLoading,
    errorMessage,
  ]);
}