import React from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import AppCard from "../components/ui/AppCard";
import { globalStyles } from "../theme/globalStyles";
import { styles } from "./NutritionScreen.styles";

export default function NutritionScreen() {
  return (
    <SafeAreaView style={globalStyles.screen}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          <AppCard style={styles.heroCard}>
            <Text style={styles.title}>Diet / Nutrition</Text>
            <Text style={styles.subtitle}>Track food intake and improve diet quality</Text>
          </AppCard>

          <AppCard style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>Log meals</Text>

            <View style={styles.row}>
              <Text style={styles.rowLabel}>Breakfast</Text>
              <Text style={styles.rowMeta}>Manual entry</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.rowLabel}>Lunch</Text>
              <Text style={styles.rowMeta}>API-sync entry</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.rowLabel}>Dinner</Text>
              <Text style={styles.rowMeta}>Pending log</Text>
            </View>
          </AppCard>

          <AppCard style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>Calories + macros</Text>
            <View style={styles.macroGrid}>
              <View style={styles.macroItem}>
                <Text style={styles.macroValue}>1,680 kcal</Text>
                <Text style={styles.macroLabel}>Calories</Text>
              </View>

              <View style={styles.macroItem}>
                <Text style={styles.macroValue}>88 g</Text>
                <Text style={styles.macroLabel}>Protein</Text>
              </View>

              <View style={styles.macroItem}>
                <Text style={styles.macroValue}>190 g</Text>
                <Text style={styles.macroLabel}>Carbs</Text>
              </View>

              <View style={styles.macroItem}>
                <Text style={styles.macroValue}>54 g</Text>
                <Text style={styles.macroLabel}>Fat</Text>
              </View>
            </View>
          </AppCard>

          <AppCard style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>AI suggestions</Text>
            <Text style={styles.aiSuggestion}>
              Increase protein intake by adding one high-protein snack this evening.
            </Text>
          </AppCard>

          <AppCard style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>Food recognition (optional)</Text>
            <Text style={styles.noteText}>Future ML add-on for camera-based meal detection.</Text>
          </AppCard>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}