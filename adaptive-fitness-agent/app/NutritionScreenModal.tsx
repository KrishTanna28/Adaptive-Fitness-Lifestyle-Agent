import {
    Modal,
    Pressable,
    ScrollView,
    Text,
    View,
} from "react-native"
import { Plus, Minus } from "lucide-react-native";
import AppButton from "../components/ui/AppButton";
import AppTextField from "../components/ui/AppTextField";
import { appTheme } from "../theme/designSystem";
import { styles } from "./NutritionScreen.styles";
import type { FoodCatalogItem, MealType } from "../services/nutritionApi";

type EntryMode = "search" | "manual";

type NutritionScreenModalProps = {
    visible: boolean;
    isSaving: boolean;
    selectedMeal: MealType;
    setSelectedMeal: (meal: MealType) => void;
    entryMode: EntryMode;
    setEntryMode: (mode: EntryMode) => void;
    searchQuery: string;
    setSearchQuery: (value: string) => void;
    isSearching: boolean;
    handleSearchFoods: () => void;
    results: FoodCatalogItem[];
    selectedFoodId: string | null;
    setSelectedFoodId: (id: string | null) => void;
    servingGramsOverride: string;
    setServingGramsOverride: (value: string) => void;
    manualName: string;
    setManualName: (value: string) => void;
    manualCalories: string;
    setManualCalories: (value: string) => void;
    manualProtein: string;
    setManualProtein: (value: string) => void;
    manualCarbs: string;
    setManualCarbs: (value: string) => void;
    manualFat: string;
    setManualFat: (value: string) => void;
    quantityLabel: string;
    decreaseQuantity: () => void;
    increaseQuantity: () => void;
    handleAddEntry: () => void;
    onClose: () => void;
    modalTitle?: string;
    submitLabel?: string;
}

const MEAL_ORDER: MealType[] = ["breakfast", "lunch", "dinner", "snacks"];
const MEAL_LABELS: Record<MealType, string> = {
    breakfast: "Breakfast",
    lunch: "Lunch",
    dinner: "Dinner",
    snacks: "Snacks",
};

function roundOne(value: number) {
    return Math.round(value * 10) / 10;
}

function formatServingInfo(item: FoodCatalogItem) {
    if (item.servingSizeGrams && item.servingSizeGrams > 0) {
        return `Serving: ${roundOne(item.servingSizeGrams)} g`;
    }

    if (item.servingText) {
        return `Serving: ${item.servingText}`;
    }

    return "";
}

export default function NutritionScreenModal(
    { visible,
        isSaving,
        selectedMeal,
        setSelectedMeal,
        entryMode,
        setEntryMode,
        searchQuery,
        setSearchQuery,
        isSearching,
        handleSearchFoods,
        results,
        selectedFoodId,
        setSelectedFoodId,
        servingGramsOverride,
        setServingGramsOverride,
        manualName,
        setManualName,
        manualCalories,
        setManualCalories,
        manualProtein,
        setManualProtein,
        manualCarbs,
        setManualCarbs,
        manualFat,
        setManualFat,
        quantityLabel,
        decreaseQuantity,
        increaseQuantity,
        handleAddEntry,
        onClose,
      modalTitle,
    submitLabel, }: NutritionScreenModalProps
) {

    const selectedFood = results.find((item) => item.id === selectedFoodId) ?? null;
    const quantityNumber = Number(quantityLabel);
    const quantityValue = Number.isFinite(quantityNumber) ? quantityNumber : 1;
    const overrideGrams = Number(servingGramsOverride);
    const gramsPerServing = Number.isFinite(overrideGrams) && overrideGrams > 0
        ? overrideGrams
        : (selectedFood?.servingSizeGrams ?? 100);
    const estimatedTotalGrams = roundOne(gramsPerServing * quantityValue);
    return (
        <Modal
            transparent
            animationType="fade"
            visible={visible}
            onRequestClose={() => {
                if (!isSaving) {
                    onClose();
                }
            }}
        >
            <View style={styles.modalOverlay}>
                <Pressable
                    style={styles.modalBackdrop}
                    onPress={() => {
                        if (!isSaving) {
                            onClose();
                        }
                    }}
                />

                <View style={styles.modalCard}>
                    <ScrollView
                        contentContainerStyle={styles.modalContent}
                        keyboardShouldPersistTaps="handled"
                        showsVerticalScrollIndicator={false}
                    >
                        <Text style={styles.modalTitle}>{modalTitle ?? "Add food entry"}</Text>
                        <Text style={styles.hintText}>Meal: {MEAL_LABELS[selectedMeal]}</Text>

                        <Text style={styles.fieldLabel}>Entry type</Text>
                        <View style={styles.modeRow}>
                            <Pressable
                                style={[styles.modeButton, entryMode === "search" && styles.modeButtonActive]}
                                onPress={() => setEntryMode("search")}
                            >
                                <Text
                                    style={[
                                        styles.modeButtonText,
                                        entryMode === "search" && styles.modeButtonTextActive,
                                    ]}
                                >
                                    Search
                                </Text>
                            </Pressable>

                            <Pressable
                                style={[styles.modeButton, entryMode === "manual" && styles.modeButtonActive]}
                                onPress={() => setEntryMode("manual")}
                            >
                                <Text
                                    style={[
                                        styles.modeButtonText,
                                        entryMode === "manual" && styles.modeButtonTextActive,
                                    ]}
                                >
                                    Manual
                                </Text>
                            </Pressable>
                        </View>

                        {entryMode === "search" ? (
                            <View style={styles.block}>
                                <AppTextField
                                    label="Food search"
                                    placeholder="Example: chicken breast, oats, paneer"
                                    value={searchQuery}
                                    onChangeText={setSearchQuery}
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                />

                                <View style={styles.searchButtonWrap}>
                                    <AppButton
                                        title={isSearching ? "Searching..." : "Search Food"}
                                        onPress={handleSearchFoods}
                                        loading={isSearching}
                                    />
                                </View>

                                {results.length > 0 ? (
                                    <View style={styles.searchResultsWrap}>
                                        {results.map((item) => {
                                            const active = item.id === selectedFoodId;
                                            return (
                                                <Pressable
                                                    key={item.id}
                                                    style={[styles.resultRow, active && styles.resultRowActive]}
                                                    onPress={() => setSelectedFoodId(item.id)}
                                                >
                                                    <View style={styles.resultLeft}>
                                                        <Text style={styles.resultTitle}>{item.name}</Text>
                                                        <Text style={styles.resultMeta}>
                                                            {item.brand ? item.brand : ""}
                                                        </Text>
                                                        <Text style={styles.resultMeta}>{formatServingInfo(item)}</Text>
                                                    </View>

                                                    <View style={styles.resultRight}>
                                                        <Text style={styles.resultCalories}>
                                                            {Math.round(item.caloriesPer100g)} kcal / 100 g
                                                        </Text>
                                                        <Text style={styles.resultMacros}>
                                                            P {roundOne(item.proteinPer100g)} • C {roundOne(item.carbsPer100g)} • F {roundOne(item.fatPer100g)} / 100 g
                                                        </Text>
                                                    </View>
                                                </Pressable>
                                            );
                                        })}
                                    </View>
                                ) : null}

                                <AppTextField
                                    label="Serving grams used for 1 quantity"
                                    placeholder="100"
                                    value={servingGramsOverride}
                                    onChangeText={setServingGramsOverride}
                                    keyboardType="decimal-pad"
                                />
                                <Text style={styles.hintText}>
                                    If serving is missing, keep 100 g or enter your estimate (for example 180 g for 1 bowl).
                                </Text>
                            </View>
                        ) : (
                            <View style={styles.block}>
                                <AppTextField
                                    label="Food name"
                                    placeholder="Example: Homemade dal khichdi"
                                    value={manualName}
                                    onChangeText={setManualName}
                                />

                                <AppTextField
                                    label="Calories per serving"
                                    placeholder="Example: 280"
                                    value={manualCalories}
                                    onChangeText={setManualCalories}
                                    keyboardType="decimal-pad"
                                />

                                <View style={styles.manualRow}>
                                    <View style={styles.manualCell}>
                                        <AppTextField
                                            label="Protein (g)"
                                            placeholder="12"
                                            value={manualProtein}
                                            onChangeText={setManualProtein}
                                            keyboardType="decimal-pad"
                                        />
                                    </View>
                                    <View style={styles.manualCell}>
                                        <AppTextField
                                            label="Carbs (g)"
                                            placeholder="34"
                                            value={manualCarbs}
                                            onChangeText={setManualCarbs}
                                            keyboardType="decimal-pad"
                                        />
                                    </View>
                                </View>

                                <AppTextField
                                    label="Fat (g)"
                                    placeholder="8"
                                    value={manualFat}
                                    onChangeText={setManualFat}
                                    keyboardType="decimal-pad"
                                />
                            </View>
                        )}

                        <Text style={styles.fieldLabel}>Quantity (servings)</Text>
                        <View style={styles.quantityRow}>
                            <Pressable style={styles.quantityButton} onPress={decreaseQuantity}>
                                <Minus size={16} color={appTheme.colors.text} strokeWidth={2.4} />
                            </Pressable>

                            <Text style={styles.quantityValue}>{quantityLabel}</Text>

                            <Pressable style={styles.quantityButton} onPress={increaseQuantity}>
                                <Plus size={16} color={appTheme.colors.text} strokeWidth={2.4} />
                            </Pressable>
                        </View>

                        <View style={styles.modalActions}>
                            <AppButton
                                title="Cancel"
                                variant="secondary"
                                onPress={() => { onClose() }}
                                disabled={isSaving}
                            />

                            <AppButton
                                title={submitLabel ?? "Add Entry"}
                                onPress={handleAddEntry}
                                loading={isSaving}
                                disabled={isSaving}
                            />
                        </View>
                        <Text style={styles.hintText}>
                            {selectedFood
                                ? `${quantityLabel} serving${quantityValue > 1 ? "s" : ""} at ${roundOne(gramsPerServing)} g per serving = ${estimatedTotalGrams} g`
                                : "Select a food result to see estimated grams for your selected quantity."}
                        </Text>
                    </ScrollView>
                </View>
            </View>
        </Modal>
    )
}