export type Gender = "MALE" | "FEMALE"
export type FitnessGoal = "LOSE_WEIGHT" | "GAIN_MUSCLE" | "MAINTAIN";
export type Lifestyle = "SEDENTARY" | "LIGHT" | "MODERATE" | "ACTIVE" | "VERY_ACTIVE";
export type DietType = "VEG" | "NON_VEG" | "VEGAN";

export type ProfileFormData = {
    name: string;
    age: string;
    gender: Gender | "";
    heightCm: string;
    weightKg: string;
    fitnessGoal: FitnessGoal | "";
    lifestyle: Lifestyle | "";
    dietType: DietType | "";
    allergies: string;
    foodRestrictions: string;
    injuries: string;
    medicalConditions: string;
    photoDataUri: string | null;
};

export type DropdownOption<T extends string> = {
    label: string;
    value: T;
};

export const EMPTY_PROFILE_FORM: ProfileFormData = {
    name: "",
    age: "",
    gender: "",
    heightCm: "",
    weightKg: "",
    fitnessGoal: "",
    lifestyle: "",
    dietType: "",
    allergies: "",
    foodRestrictions: "",
    injuries: "",
    medicalConditions: "",
    photoDataUri: null,
};

export const FITNESS_GOAL_OPTIONS: Array<{ label: string; value: FitnessGoal }> = [
    { label: "Lose Weight", value: "LOSE_WEIGHT" },
    { label: "Gain Muscle", value: "GAIN_MUSCLE" },
    { label: "Maintain", value: "MAINTAIN" },
];

export const LIFESTYLE_OPTIONS: Array<{ label: string; value: Lifestyle }> = [
    { label: "Sedentary", value: "SEDENTARY" },
    { label: "Light", value: "LIGHT" },
    { label: "Moderate", value: "MODERATE" },
    { label: "Active", value: "ACTIVE" },
    { label: "Very Active", value: "VERY_ACTIVE" },
];

export const DIET_TYPE_OPTIONS: Array<{ label: string; value: DietType }> = [
    { label: "Veg", value: "VEG" },
    { label: "Non-veg", value: "NON_VEG" },
    { label: "Vegan", value: "VEGAN" },
];

export const GENDER_OPTIONS: Array<{ label: string; value: Gender }> = [
    { label: "Male", value: "MALE" },
    { label: "Female", value: "FEMALE" }
];
export const GENDER_LABELS: Record<Gender, string> = {
    MALE: "Male",
    FEMALE: "Female"
};
export const FITNESS_GOAL_LABELS: Record<FitnessGoal, string> = {
    LOSE_WEIGHT: "Lose Weight",
    GAIN_MUSCLE: "Gain Muscle",
    MAINTAIN: "Maintain",
};

export const LIFESTYLE_LABELS: Record<Lifestyle, string> = {
    SEDENTARY: "Sedentary (little/no exercise)",
    LIGHT: "Light",
    MODERATE: "Moderate",
    ACTIVE: "Active",
    VERY_ACTIVE: "Very Active",
};

export const DIET_TYPE_LABELS: Record<DietType, string> = {
    VEG: "Veg",
    NON_VEG: "Non-veg",
    VEGAN: "Vegan",
};