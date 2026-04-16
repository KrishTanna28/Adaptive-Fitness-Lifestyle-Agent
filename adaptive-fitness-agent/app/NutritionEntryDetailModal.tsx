import { Modal, View, Pressable, Text } from "react-native";
import { X } from "lucide-react-native";

import AppButton from "../components/ui/AppButton";
import { appTheme } from "@/theme/designSystem";
import type { MealType } from "@/services/nutritionApi";
import type { LoggedFoodEntry } from "@/services/nutritionLog";
import { detailModalStyles } from "./NutritionScreen.styles"

type NutritionEntryDetailModalProps = {
  visible: boolean;
  entry: LoggedFoodEntry | null;
  isBusy?: boolean;
  onClose: () => void;
  canEdit: boolean;
  onUpdateEntry: () => void;
  onDeleteEntry: () => void;
}

const MEAL_LABELS: Record<MealType, string> = {
  breakfast: "Breakfast",
  lunch: "Lunch",
  dinner: "Dinner",
  snacks: "Snacks",
};

function roundOne(value: number) {
  return Math.round(value * 10) / 10;
}

function formatQuantity(value: number) {
  if (Number.isInteger(value)) {
    return String(value);
  }
  return value.toFixed(2).replace(/\.?0+$/, "");
}

export default function NutritionEntryDetailModal({
  visible,
  entry,
  isBusy,
  onClose,
  canEdit,
  onUpdateEntry,
  onDeleteEntry,
}: NutritionEntryDetailModalProps) {
  return (
    <Modal
      transparent
      animationType="fade"
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={detailModalStyles.overlay}>
        <Pressable style={detailModalStyles.backdrop} onPress={onClose} />

        <View style={detailModalStyles.card}>
          <View style={detailModalStyles.content}>
            <View style={detailModalStyles.headerRow}>
              <Text style={detailModalStyles.title}>{entry?.name ?? "Entry details"}</Text>

              <Pressable
                style={detailModalStyles.modalCloseButton}
                accessibilityRole="button"
                accessibilityLabel="Entry options"
                disabled={!entry || isBusy}
                onPress={onClose}
              >
                <Text style={detailModalStyles.modalCloseText}><X size={18} color={appTheme.colors.text} strokeWidth={2.2}></X></Text>
              </Pressable>
            </View>

            {entry ? (
              <>
                <Text style={detailModalStyles.meta}>Meal: {MEAL_LABELS[entry.mealType]}</Text>
                <Text style={detailModalStyles.line}>Quantity: {formatQuantity(entry.quantity)} serving</Text>
                <Text style={detailModalStyles.line}>Calories: {Math.round(entry.calories)} kcal</Text>
                <Text style={detailModalStyles.line}>Protein: {roundOne(entry.protein)} g</Text>
                <Text style={detailModalStyles.line}>Carbs: {roundOne(entry.carbs)} g</Text>
                <Text style={detailModalStyles.line}>Fat: {roundOne(entry.fat)} g</Text>
                <Text style={detailModalStyles.line}>Fibre: {roundOne(entry.fiber)} g</Text>
                <Text style={detailModalStyles.line}>Sodium: {roundOne(entry.sodiumMg)} mg</Text>
                <Text style={detailModalStyles.line}>Potassium: {roundOne(entry.potassiumMg)} mg</Text>
                <Text style={detailModalStyles.line}>Calcium: {roundOne(entry.calciumMg)} mg</Text>
                <Text style={detailModalStyles.line}>Iron: {roundOne(entry.ironMg)} mg</Text>
                <Text style={detailModalStyles.line}>Vitamin C: {roundOne(entry.vitaminCMg)} mg</Text>
              </>
            ) : null}

            {canEdit ? (<View style={detailModalStyles.menu}>
              <AppButton
                title="Update entry"
                variant="primary"
                disabled={isBusy}
                onPress={onUpdateEntry}
              />
              <AppButton
                title="Delete entry"
                variant="secondary"
                disabled={isBusy}
                onPress={onDeleteEntry}
              />
            </View>) : null}
          </View>
        </View>
      </View>
    </Modal>
  );
}