import React, { useEffect, useMemo, useState } from "react";
import {
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { Plus } from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import NutritionScreenModal from "./NutritionScreenModal";

import AppCard from "../components/ui/AppCard";
import {
  getUserFriendlyErrorMessage,
  useAppAlert,
} from "../components/ui/AppAlert";
import { useAuthUser } from "../hooks/useAuthUser";
import {
  searchFoodCatalog,
  type FoodCatalogItem,
  type MealType,
} from "../services/nutritionApi";
import {
  getTodayDateKey,
  loadDailyNutritionLog,
  saveDailyNutritionLog,
  type LoggedFoodEntry,
} from "../services/nutritionLog";
import { appTheme } from "../theme/designSystem";
import { globalStyles } from "../theme/globalStyles";
import { styles } from "./NutritionScreen.styles";
import NutritionEntryDetailModal from "./NutritionEntryDetailModal";

const MEAL_ORDER: MealType[] = ["breakfast", "lunch", "dinner", "snacks"];
const MEAL_LABELS: Record<MealType, string> = {
  breakfast: "Breakfast",
  lunch: "Lunch",
  dinner: "Dinner",
  snacks: "Snacks",
};

const MIN_QUANTITY = 1;
const MAX_QUANTITY = 20;
const QUANTITY_STEP = 0.25;

type EntryMode = "search" | "manual";

function clampQuantity(value: number) {
  return Math.min(MAX_QUANTITY, Math.max(MIN_QUANTITY, value));
}

function formatQuantity(value: number) {
  if (Number.isInteger(value)) {
    return String(value);
  }
  return value.toFixed(2).replace(/\.?0+$/, "");
}

function roundOne(value: number) {
  return Math.round(value * 10) / 10;
}

function perServing(total: number, quantity: number) {
  if (!Number.isFinite(quantity) || quantity <= 0) {
    return total;
  }
  return total / quantity;
}

export default function NutritionScreen() {
  const { showAlert } = useAppAlert();
  const { user, loading: authLoading } = useAuthUser();
  const todayKey = getTodayDateKey();

  const [entries, setEntries] = useState<LoggedFoodEntry[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoadingLog, setIsLoadingLog] = useState(true);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState<MealType>("breakfast");
  const [entryMode, setEntryMode] = useState<EntryMode>("search");
  const [quantity, setQuantity] = useState(1);

  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState<FoodCatalogItem[]>([]);
  const [selectedFoodId, setSelectedFoodId] = useState<string | null>(null);
  const [servingGramsOverride, setServingGramsOverride] = useState("");

  const [manualName, setManualName] = useState("");
  const [manualCalories, setManualCalories] = useState("");
  const [manualProtein, setManualProtein] = useState("");
  const [manualCarbs, setManualCarbs] = useState("");
  const [manualFat, setManualFat] = useState("");

  const [selectedEntry, setSelectedEntry] = useState<LoggedFoodEntry | null>(null);
  const [isEntryDetailVisible, setIsEntryDetailVisible] = useState(false);
  const [editingEntryId, setEditingEntryId] = useState<string | null>(null);

  const openEntryDetail = (entry: LoggedFoodEntry) => {
    setSelectedEntry(entry);
    setIsEntryDetailVisible(true);
  }

  const closeEntryDetail = () => {
    setIsEntryDetailVisible(false);
    setSelectedEntry(null);
  }

  const handleEditSelectedEntry = () => {
    if (!selectedEntry) return;

    const qty = clampQuantity(selectedEntry.quantity);
    setEditingEntryId(selectedEntry.id);
    setSelectedMeal(selectedEntry.mealType);
    setEntryMode("manual");
    setSearchQuery("");
    setResults([]);
    setSelectedFoodId(null);
    setServingGramsOverride("");

    setManualName(selectedEntry.name);
    setManualCalories(formatQuantity(roundOne(perServing(selectedEntry.calories, qty))));
    setManualProtein(formatQuantity(roundOne(perServing(selectedEntry.protein, qty))));
    setManualCarbs(formatQuantity(roundOne(perServing(selectedEntry.carbs, qty))));
    setManualFat(formatQuantity(roundOne(perServing(selectedEntry.fat, qty))));
    setQuantity(qty);

    closeEntryDetail();
    setIsModalVisible(true);
  };

  const handleDeleteSelectedEntry = () => {
    if (!selectedEntry) return;

    const entryToDelete = selectedEntry;

    showAlert({
      title: "Delete entry?",
      message: `Delete ${entryToDelete.name} from ${MEAL_LABELS[entryToDelete.mealType]}?`,
      actions: [
        { label: "Cancel", style: "secondary" },
        {
          label: "Delete", style: "primary", onPress: async () => {
            try {
              const nextEntries = entries.filter((item) => item.id !== entryToDelete.id);
              await persistEntries(nextEntries);
              closeEntryDetail();
            } catch (error) {
              showAlert({
                title: "Could not delete entry",
                message: getUserFriendlyErrorMessage(
                  error,
                  "Please try again in a moment.",
                ),
              });
            }
          }
        }
      ]
    })
  }

  useEffect(() => {
    let mounted = true;

    const loadLog = async () => {
      if (!user?.uid) {
        if (mounted) {
          setEntries([]);
          setIsLoadingLog(false);
        }
        return;
      }

      setIsLoadingLog(true);

      try {
        const log = await loadDailyNutritionLog(user.uid, todayKey);
        if (mounted) {
          setEntries(log.entries);
        }
      } catch (error) {
        if (!mounted) {
          showAlert({
            title: "Could not load nutrition log",
            message: getUserFriendlyErrorMessage(
              error,
              "Please check your connection and try again.",
            ),
          });
        }
      } finally {
        if (mounted) {
          setIsLoadingLog(false);
        }
      }
    };

    loadLog().catch(() => {
      if (mounted) {
        setIsLoadingLog(false);
      }
    });

    return () => {
      mounted = false;
    };
  }, [showAlert, todayKey, user?.uid]);

  const selectedFood = useMemo(
    () => results.find((item) => item.id === selectedFoodId) ?? null,
    [results, selectedFoodId],
  );

  useEffect(() => {
    if (!selectedFood) {
      setServingGramsOverride("");
      return;
    }

    const suggestedServing = selectedFood.servingSizeGrams ?? 100;
    setServingGramsOverride(formatQuantity(roundOne(suggestedServing)));
  }, [selectedFood]);

  const groupedEntries = useMemo(() => {
    return MEAL_ORDER.reduce<Record<MealType, LoggedFoodEntry[]>>((acc, meal) => {
      acc[meal] = entries.filter((entry) => entry.mealType === meal);
      return acc;
    }, {
      breakfast: [],
      lunch: [],
      dinner: [],
      snacks: [],
    });
  }, [entries]);

  const totals = useMemo(() => {
    return entries.reduce(
      (acc, entry) => {
        acc.calories += entry.calories;
        acc.protein += entry.protein;
        acc.carbs += entry.carbs;
        acc.fat += entry.fat;
        return acc;
      },
      { calories: 0, protein: 0, carbs: 0, fat: 0 },
    );
  }, [entries]);

  const openAddModal = (meal: MealType) => {
    setSelectedMeal(meal);
    setEntryMode("search");
    setSearchQuery("");
    setResults([]);
    setSelectedFoodId(null);
    setServingGramsOverride("");
    setManualName("");
    setManualCalories("");
    setManualProtein("");
    setManualCarbs("");
    setManualFat("");
    setQuantity(1);
    setIsModalVisible(true);
    setEditingEntryId(null);
  };

  const persistEntries = async (nextEntries: LoggedFoodEntry[]) => {
    if (!user?.uid) {
      throw new Error("You must be signed in to log meals.");
    }

    setIsSaving(true);

    try {
      await saveDailyNutritionLog(user.uid, todayKey, nextEntries);
      setEntries(nextEntries);
    } finally {
      setIsSaving(false);
    }
  };

  const handleSearchFoods = async () => {
    const query = searchQuery.trim();

    if (query.length < 2) {
      showAlert({
        title: "Search is too short",
        message: "Please type at least 2 characters.",
      });
      return;
    }

    setIsSearching(true);

    try {
      const data = await searchFoodCatalog({
        query,
        pageSize: 20,
      });

      setResults(data);
      setSelectedFoodId(data[0]?.id ?? null);
    } catch (error) {
      showAlert({
        title: "Search failed",
        message: getUserFriendlyErrorMessage(
          error,
          "Could not fetch foods right now. Try again.",
        ),
      });
    } finally {
      setIsSearching(false);
    }
  };

  const handleAddEntry = async () => {
    const existingEntry = editingEntryId ? entries.find((entry) => entry.id === editingEntryId) ?? null : null;
    try {
      let newEntry: LoggedFoodEntry;

      if (entryMode === "search") {
        if (!selectedFood) {
          showAlert({
            title: "No food selected",
            message: "Select one search result before adding.",
          });
          return;
        }

        const overrideValue = Number(servingGramsOverride);
        const hasValidOverride = Number.isFinite(overrideValue) && overrideValue > 0;
        const servingSize = hasValidOverride
          ? overrideValue
          : (selectedFood.servingSizeGrams ?? 100);
        const consumedGrams = servingSize * quantity;

        newEntry = {
          id: existingEntry?.id ?? `entry-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
          mealType: selectedMeal,
          name: selectedFood.name,
          source: selectedFood.source,
          quantity: roundOne(quantity),
          unit: "serving",
          calories: roundOne((selectedFood.caloriesPer100g * consumedGrams) / 100),
          protein: roundOne((selectedFood.proteinPer100g * consumedGrams) / 100),
          carbs: roundOne((selectedFood.carbsPer100g * consumedGrams) / 100),
          fat: roundOne((selectedFood.fatPer100g * consumedGrams) / 100),
          loggedAt: existingEntry?.loggedAt ?? new Date().toISOString(),
        };
      } else {
        const name = manualName.trim();
        const cals = Number(manualCalories);
        const protein = Number(manualProtein);
        const carbs = Number(manualCarbs);
        const fat = Number(manualFat);

        if (!name) {
          showAlert({
            title: "Missing food name",
            message: "Please enter the food name for manual entry.",
          });
          return;
        }

        const values = [cals, protein, carbs, fat];
        if (values.some((value) => !Number.isFinite(value) || value < 0)) {
          showAlert({
            title: "Invalid numbers",
            message: "Calories and macros must be valid non-negative numbers.",
          });
          return;
        }

        newEntry = {
          id: `entry-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
          mealType: selectedMeal,
          name,
          source: existingEntry?.source ?? "Manual",
          quantity: roundOne(quantity),
          unit: "serving",
          calories: roundOne(cals * quantity),
          protein: roundOne(protein * quantity),
          carbs: roundOne(carbs * quantity),
          fat: roundOne(fat * quantity),
          loggedAt: new Date().toISOString(),
        };
      }

      const nextEntries = existingEntry
        ? entries.map((entry) => (entry.id === existingEntry.id ? newEntry : entry))
        : [...entries, newEntry];
      await persistEntries(nextEntries);
      setEditingEntryId(null);
      setIsModalVisible(false);
    } catch (error) {
      showAlert({
        title: "Could not save entry",
        message: getUserFriendlyErrorMessage(
          error,
          "Please try again in a moment.",
        ),
      });
    }
  };

  const decreaseQuantity = () => {
    setQuantity((prev) => clampQuantity(prev - QUANTITY_STEP));
  };

  const increaseQuantity = () => {
    setQuantity((prev) => clampQuantity(prev + QUANTITY_STEP));
  };

  const quantityLabel = formatQuantity(quantity);

  return (
    <SafeAreaView style={globalStyles.screen}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.container}>
          <AppCard style={styles.heroCard}>
            <View style={styles.heroTopRow}>
              <View style={styles.heroTextWrap}>
                <Text style={styles.title}>Diet / Nutrition</Text>
                <Text style={styles.subtitle}>Search, log, and track meals for today</Text>
              </View>
            </View>

            <Text style={styles.dateText}>Date: {todayKey}</Text>
          </AppCard>

          <AppCard style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>Daily totals</Text>

            <View style={styles.macroGrid}>
              <View style={styles.macroItem}>
                <Text style={styles.macroValue}>{Math.round(totals.calories)} kcal</Text>
                <Text style={styles.macroLabel}>Calories</Text>
              </View>

              <View style={styles.macroItem}>
                <Text style={styles.macroValue}>{roundOne(totals.protein)} g</Text>
                <Text style={styles.macroLabel}>Protein</Text>
              </View>

              <View style={styles.macroItem}>
                <Text style={styles.macroValue}>{roundOne(totals.carbs)} g</Text>
                <Text style={styles.macroLabel}>Carbs</Text>
              </View>

              <View style={styles.macroItem}>
                <Text style={styles.macroValue}>{roundOne(totals.fat)} g</Text>
                <Text style={styles.macroLabel}>Fat</Text>
              </View>
            </View>
          </AppCard>

          {MEAL_ORDER.map((meal) => {
            const mealEntries = groupedEntries[meal];

            return (
              <AppCard key={meal} style={styles.sectionCard}>
                <View style={styles.mealHeaderRow}>
                  <Text style={styles.sectionTitle}>{MEAL_LABELS[meal]}</Text>

                  <Pressable
                    style={styles.addMealButton}
                    onPress={() => openAddModal(meal)}
                    accessibilityRole="button"
                    accessibilityLabel={`Add ${MEAL_LABELS[meal]} entry`}
                  >
                    <Plus size={14} color={appTheme.colors.text} strokeWidth={2.4} />
                    <Text style={styles.addMealText}>Add</Text>
                  </Pressable>
                </View>

                {mealEntries.length === 0 ? (
                  <Text style={styles.emptyText}>No entries yet.</Text>
                ) : (
                  <View style={styles.entriesList}>
                    {mealEntries.map((entry) => (
                      <Pressable key={entry.id} style={styles.entryRow} onPress={() => openEntryDetail(entry)} accessibilityRole="button" accessibilityLabel={`View ${entry.name} details`}>
                        <View style={styles.entryLeft}>
                          <Text style={styles.entryName}>{entry.name}</Text>
                          <Text style={styles.entryMeta}>
                            {formatQuantity(entry.quantity)} serving
                          </Text>
                        </View>

                        <View style={styles.entryRight}>
                          <Text style={styles.entryCalories}>
                            {Math.round(entry.calories)} kcal
                          </Text>
                          <Text style={styles.entryMacros}>
                            P {roundOne(entry.protein)} • C {roundOne(entry.carbs)} • F {roundOne(entry.fat)}
                          </Text>
                        </View>
                      </Pressable>
                    ))}
                  </View>
                )}
              </AppCard>
            );
          })}

          {authLoading || isLoadingLog ? (
            <AppCard style={styles.sectionCard}>
              <Text style={styles.emptyText}>Loading nutrition log...</Text>
            </AppCard>
          ) : null}
        </View>
      </ScrollView>
      <NutritionScreenModal
        visible={isModalVisible}
        isSaving={isSaving}
        selectedMeal={selectedMeal}
        setSelectedMeal={setSelectedMeal}
        entryMode={entryMode}
        setEntryMode={setEntryMode}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        isSearching={isSearching}
        handleSearchFoods={handleSearchFoods}
        results={results}
        selectedFoodId={selectedFoodId}
        setSelectedFoodId={setSelectedFoodId}
        servingGramsOverride={servingGramsOverride}
        setServingGramsOverride={setServingGramsOverride}
        manualName={manualName}
        setManualName={setManualName}
        manualCalories={manualCalories}
        setManualCalories={setManualCalories}
        manualProtein={manualProtein}
        setManualProtein={setManualProtein}
        manualCarbs={manualCarbs}
        setManualCarbs={setManualCarbs}
        manualFat={manualFat}
        setManualFat={setManualFat}
        quantityLabel={quantityLabel}
        decreaseQuantity={decreaseQuantity}
        increaseQuantity={increaseQuantity}
        handleAddEntry={handleAddEntry}
        modalTitle={editingEntryId ? "Update food entry" : "Add food entry"}
        submitLabel={editingEntryId ? "Update Entry" : "Add Entry"}
        onClose={() => {
          setEditingEntryId(null);
          setIsModalVisible(false);
        }}
      />
      <NutritionEntryDetailModal
  visible={isEntryDetailVisible}
  entry={selectedEntry}
  isBusy={isSaving}
  onClose={closeEntryDetail}
  onUpdateEntry={handleEditSelectedEntry}
  onDeleteEntry={handleDeleteSelectedEntry}
/>
    </SafeAreaView>
  );
}