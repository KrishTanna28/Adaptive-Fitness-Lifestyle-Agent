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
  loggedAt: string;
}

type DailyNutritionLog = {
    dateKey : string,
    entries : LoggedFoodEntry[]
}

export function getTodayDateKey(date = new Date()){
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

export async function loadDailyNutritionLog(
    uid : string,
    dateKey : string
) : Promise<DailyNutritionLog>{
    const ref = doc(db, "users", uid, "nutritionLogs", dateKey);
    const snapshot = await getDoc(ref);

    if(!snapshot.exists()){
        return {dateKey, entries : []};
    }

    const data = snapshot.data();

    return {
        dateKey,
        entries : Array.isArray(data.entries) ? (data.entries as LoggedFoodEntry[]) : []
    };
}

export async function saveDailyNutritionLog(
    uid : string,
    dateKey : string,
    entries: LoggedFoodEntry[],
){
    const ref = doc(db, "users", uid, "nutritionLogs", dateKey);
    await setDoc(
        ref, {
            dateKey,
            entries,
            updaeAt: serverTimestamp(),
        },
        { merge : true },
    );
}