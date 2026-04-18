import { toPositiveNumberOrThrow } from "./helperFunctions";

export type CalorieProfileGender = "MALE" | "FEMALE";

export type UserMetProfile = {
    age: number | null;
    gender: CalorieProfileGender | null;
    heightCm: number | null;
    weightKg: number | null;
}

export type CompleteUserMetProfile = {
    age: number;
    gender: CalorieProfileGender;
    heightCm: number;
    weightKg: number;
}

export type WorkoutCalorieInput = {
    metValue: number;
    durationMin: number;
    profile: UserMetProfile | CompleteUserMetProfile;
};

export type WorkoutCalorieResult = {
    bmrKcalPerDay: number;
    restingKcalPerMin: number;
    grossCalories: number;
    activeCalories: number;
}

export function hasCompleteCalorieProfile(
    profile: UserMetProfile | null | undefined
): profile is CompleteUserMetProfile {
    if (!profile) return false;

    return (
        typeof profile.age === "number" && profile.age > 0 &&
        typeof profile.heightCm === "number" &&
        profile.heightCm > 0 &&
        typeof profile.weightKg === "number" &&
        profile.weightKg > 0 &&
        (profile.gender === "MALE" || profile.gender === "FEMALE")
    );
}

function toCompleteProfileOrThrow(
    profile: UserMetProfile | CompleteUserMetProfile,
): CompleteUserMetProfile {
    if (!hasCompleteCalorieProfile(profile)) {
        throw new Error("Profile must include age, gender, heightCm, and weightKg.");
    }
    return profile;
}

export function calculateWorkoutCalories(input: WorkoutCalorieInput): WorkoutCalorieResult {
    const metValue = toPositiveNumberOrThrow(input.metValue, "metValue");
    const durationMin = toPositiveNumberOrThrow(input.durationMin, "durationMin");
    const profile = toCompleteProfileOrThrow(input.profile);

    const sexConstant = profile.gender === "MALE" ? 5 : -161;

    const bmrKcalPerDay =
        10 * profile.weightKg +
        6.25 * profile.heightCm -
        5 * profile.age +
        sexConstant;

    const restingKcalPerMin = bmrKcalPerDay / 1440;
    const grossCalories = metValue * restingKcalPerMin * durationMin;
    const activeCalories = Math.max(
        0,
        (metValue - 1) * restingKcalPerMin * durationMin,
    );

    return {
    bmrKcalPerDay,
    restingKcalPerMin,
    grossCalories,
    activeCalories,
  };
}

