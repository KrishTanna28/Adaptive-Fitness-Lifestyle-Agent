import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "./firebase";
import type { MetIntensity } from "./workoutMetDataset";
import { toText, toNumber } from "./helperFunctions";

export type MappingSource = "auto" | "auto-needs-review" | "confirmed";

export type WorkoutMetMappingInput = {
  exerciseId: string;
  workoutName: string;
  intensity: MetIntensity;
  metRowId: string;
  metActivity: string;
  metValue: number;
  score: number;
  datasetVersion: string;
  resolverVersion: string;
  mappingSource: MappingSource;
};

function mappingRef(uid: string, exerciseId: string) {
  return doc(db, "users", uid, "workoutMetMappings", exerciseId);
}

export async function loadWorkoutMetMapping(
  uid: string,
  exerciseId: string,
): Promise<WorkoutMetMappingInput | null> {
  const snap = await getDoc(mappingRef(uid, exerciseId));
  if (!snap.exists()) {
    return null;
  }

  const raw = snap.data() as Record<string, unknown>;
  const metRowId = toText(raw.metRowId);
  if (!metRowId) {
    return null;
  }

  return {
    exerciseId: toText(raw.exerciseId) || exerciseId,
    workoutName: toText(raw.workoutName),
    intensity:
      raw.intensity === "low" || raw.intensity === "moderate" || raw.intensity === "vigorous"
        ? raw.intensity
        : "moderate",
    metRowId,
    metActivity: toText(raw.metActivity),
    metValue: toNumber(raw.metValue, 0),
    score: toNumber(raw.score, 0),
    datasetVersion: toText(raw.datasetVersion),
    resolverVersion: toText(raw.resolverVersion),
    mappingSource:
      raw.mappingSource === "confirmed" ||
      raw.mappingSource === "auto" ||
      raw.mappingSource === "auto-needs-review"
        ? raw.mappingSource
        : "auto",
  };
}

export async function upsertWorkoutMetMappingPartial(
  uid: string,
  input: WorkoutMetMappingInput,
): Promise<{ updated: boolean; changedFields: string[] }> {
  const ref = mappingRef(uid, input.exerciseId);
  const snap = await getDoc(ref);
  const existing = snap.exists() ? (snap.data() as Record<string, unknown>) : null;

  const patch: Record<string, unknown> = {};
  const changedFields: string[] = [];

  const maybeSet = (key: keyof WorkoutMetMappingInput, value: unknown) => {
    const prev = existing ? existing[key] : undefined;
    if (prev !== value) {
      patch[key] = value;
      changedFields.push(String(key));
    }
  };

  maybeSet("exerciseId", input.exerciseId);
  maybeSet("workoutName", input.workoutName);
  maybeSet("intensity", input.intensity);
  maybeSet("metRowId", input.metRowId);
  maybeSet("metActivity", input.metActivity);
  maybeSet("metValue", toNumber(input.metValue, 0));
  maybeSet("score", toNumber(input.score, 0));
  maybeSet("datasetVersion", input.datasetVersion);
  maybeSet("resolverVersion", input.resolverVersion);
  maybeSet("mappingSource", input.mappingSource);

  if (changedFields.length === 0) {
    return { updated: false, changedFields: [] };
  }

  patch.updatedAt = serverTimestamp();
  await setDoc(ref, patch, { merge: true });

  return { updated: true, changedFields };
}