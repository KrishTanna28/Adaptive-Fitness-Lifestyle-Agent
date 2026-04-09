import React from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import AppButton from "../components/ui/AppButton";
import AppCard from "../components/ui/AppCard";
import { useAppAlert } from "../components/ui/AppAlert";
import { globalStyles } from "../theme/globalStyles";
import { styles } from "./WorkoutScreen.styles";

const suggestedWorkouts = [
  "Upper Body Strength Blast",
  "20-Min Cardio Burn",
  "Mobility and Flexibility Flow",
];

export default function WorkoutScreen() {
  const { showAlert } = useAppAlert();

  return (
    <SafeAreaView style={globalStyles.screen}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          <AppCard style={styles.heroCard}>
            <Text style={styles.title}>Workout</Text>
            <Text style={styles.subtitle}>Structured plans tailored to your routine</Text>
          </AppCard>

          <AppCard style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>Suggested workouts (AI-based)</Text>
            {suggestedWorkouts.map((workout) => (
              <View key={workout} style={styles.suggestionItem}>
                <Text style={styles.suggestionName}>{workout}</Text>
                <Text style={styles.suggestionMeta}>Based on your current energy and goals</Text>
              </View>
            ))}
          </AppCard>

          <AppCard style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>Categories</Text>
            <View style={styles.categoryRow}>
              <View style={styles.categoryChip}>
                <Text style={styles.categoryChipText}>Strength</Text>
              </View>
              <View style={styles.categoryChip}>
                <Text style={styles.categoryChipText}>Cardio</Text>
              </View>
              <View style={styles.categoryChip}>
                <Text style={styles.categoryChipText}>Flexibility</Text>
              </View>
            </View>
          </AppCard>

          <AppCard style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>Exercise details</Text>

            <View style={styles.detailsRow}>
              <Text style={styles.exerciseName}>Push-ups</Text>
              <Text style={styles.exerciseMeta}>3 sets x 12 reps</Text>
            </View>

            <View style={styles.detailsRow}>
              <Text style={styles.exerciseName}>Bodyweight Squats</Text>
              <Text style={styles.exerciseMeta}>4 sets x 10 reps</Text>
            </View>

            <View style={styles.detailsRow}>
              <Text style={styles.exerciseName}>Plank Hold</Text>
              <Text style={styles.exerciseMeta}>3 sets x 45 sec</Text>
            </View>

            <View style={styles.animationPreview}>
              <Text style={styles.animationText}>Exercise animation preview (demo)</Text>
            </View>

            <AppButton
              title="Start workout session"
              onPress={() => {
                showAlert({
                  title: "Workout started",
                  message: "Session tracking started for this demo workout.",
                });
              }}
            />
          </AppCard>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}