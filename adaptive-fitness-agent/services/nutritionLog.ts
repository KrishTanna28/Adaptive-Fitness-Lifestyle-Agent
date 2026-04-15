import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "./firebase";
import type { FoodSource, MealType } from "./nutritionApi";

export type LoggedFoodEntry = {
    id: string;
    mealType: MealType;
    name: string;
    source: FoodSource;
    quantity: number;
    unit: "serving";
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    fiber: number;
    sodiumMg: number;
    potassiumMg: number;
    calciumMg: number;
    ironMg: number;
    vitaminCMg: number;
    loggedAt: string;
}

type DailyNutritionLog = {
    dateKey: string,
    entries: LoggedFoodEntry[]
}

function toNumber(value: unknown, fallback = 0) {
    const n = typeof value === "number" ? value : Number(value);
    return Number.isFinite(n) ? n : fallback;
}

function normalizeEntry(raw: Partial<LoggedFoodEntry>): LoggedFoodEntry {
    const mealType: MealType =
        raw.mealType === "breakfast" ||
            raw.mealType === "lunch" ||
            raw.mealType === "dinner" ||
            raw.mealType === "snacks"
            ? raw.mealType
            : "snacks";

    const source: FoodSource =
        raw.source === "USDA" || raw.source === "OpenFoodFacts" || raw.source === "Manual"
            ? raw.source
            : "Manual";

    return {
        id: typeof raw.id === "string" && raw.id ? raw.id : "entry-" + Date.now().toString(),
        mealType,
        name: typeof raw.name === "string" ? raw.name : "",
        source,
        quantity: toNumber(raw.quantity, 1),
        unit: "serving",
        calories: toNumber(raw.calories, 0),
        protein: toNumber(raw.protein, 0),
        carbs: toNumber(raw.carbs, 0),
        fat: toNumber(raw.fat, 0),
        fiber: toNumber(raw.fiber, 0),
        sodiumMg: toNumber(raw.sodiumMg, 0),
        potassiumMg: toNumber(raw.potassiumMg, 0),
        calciumMg: toNumber(raw.calciumMg, 0),
        ironMg: toNumber(raw.ironMg, 0),
        vitaminCMg: toNumber(raw.vitaminCMg, 0),
        loggedAt:
            typeof raw.loggedAt === "string" && raw.loggedAt
                ? raw.loggedAt
                : new Date().toISOString(),
    };
}

export function getTodayDateKey(date = new Date()) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

export async function loadDailyNutritionLog(
    uid: string,
    dateKey: string
): Promise<DailyNutritionLog> {
    const ref = doc(db, "users", uid, "nutritionLogs", dateKey);
    const snapshot = await getDoc(ref);

    if (!snapshot.exists()) {
        return { dateKey, entries: [] };
    }

    const data = snapshot.data();

    return {
        dateKey,
        entries: Array.isArray(data.entries)
            ? data.entries.map((entry) => normalizeEntry((entry ?? {}) as Partial<LoggedFoodEntry>))
            : []
    };
}

export async function saveDailyNutritionLog(
    uid: string,
    dateKey: string,
    entries: LoggedFoodEntry[],
) {
    const ref = doc(db, "users", uid, "nutritionLogs", dateKey);
    await setDoc(
        ref, {
        dateKey,
        entries,
        updatedAt: serverTimestamp(),
    },
        { merge: true },
    );
}