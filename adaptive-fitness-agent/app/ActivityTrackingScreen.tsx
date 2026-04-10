import React from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Activity, Flame, Footprints, Target } from "lucide-react-native";

import AppCard from "../components/ui/AppCard";
import type { LiveStepCounter } from "../hooks/useLiveStepCounter";
import { appTheme } from "../theme/designSystem";
import { globalStyles } from "../theme/globalStyles";
import { styles } from "./ActivityTrackingScreen.styles";

const dailyTrend = [56, 71, 64, 82, 77, 90, 72];
const weeklyTrend = [48, 62, 59, 74, 81, 69, 85];
const monthlyTrend = [45, 52, 67, 61, 70, 76, 81, 73];

type ActivityTrackingScreenProps = {
  liveStepCounter: LiveStepCounter;
};

export default function ActivityTrackingScreen({
  liveStepCounter,
}: ActivityTrackingScreenProps) {
  const stepCountText = liveStepCounter.isLoading
    ? "Loading..."
    : liveStepCounter.stepsToday.toLocaleString();
  const distanceText = `${liveStepCounter.distanceKm.toFixed(2)} km`;
  const caloriesText = `${liveStepCounter.caloriesBurned} kcal`;

  return (
    <SafeAreaView style={globalStyles.screen}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          <AppCard style={styles.heroCard}>
            <Text style={styles.title}>Activity + Progress</Text>
            <Text style={styles.subtitle}>Track movement details and long-term analytics</Text>
          </AppCard>

          <View style={styles.quickStatsGrid}>
            <AppCard style={styles.quickStatCard}>
              <View style={styles.valueRow}>
                <Footprints size={18} color={appTheme.colors.text} strokeWidth={2.2} />
                <Text style={styles.valueText}>{stepCountText}</Text>
              </View>
              <Text style={styles.labelText}>Steps</Text>
            </AppCard>

            <AppCard style={styles.quickStatCard}>
              <View style={styles.valueRow}>
                <Target size={18} color={appTheme.colors.text} strokeWidth={2.2} />
                <Text style={styles.valueText}>{distanceText}</Text>
              </View>
              <Text style={styles.labelText}>Distance</Text>
            </AppCard>

            <AppCard style={styles.quickStatCard}>
              <View style={styles.valueRow}>
                <Flame size={18} color={appTheme.colors.text} strokeWidth={2.2} />
                <Text style={styles.valueText}>{caloriesText}</Text>
              </View>
              <Text style={styles.labelText}>Calories burned</Text>
            </AppCard>

            <AppCard style={styles.quickStatCard}>
              <View style={styles.valueRow}>
                <Activity size={18} color={appTheme.colors.text} strokeWidth={2.2} />
                <Text style={styles.valueText}>7-day avg 7,600</Text>
              </View>
              <Text style={styles.labelText}>Past days step count</Text>
            </AppCard>
          </View>

          <AppCard style={styles.detectionCard}>
            <Text style={styles.sectionTitle}>Workout detection</Text>
            <View style={styles.badgeRow}>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>Walking</Text>
              </View>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>Running</Text>
              </View>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>Cycling</Text>
              </View>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>Workout detected: Running</Text>
              </View>
            </View>
          </AppCard>

          <AppCard style={styles.graphCard}>
            <Text style={styles.sectionTitle}>Daily trend (steps)</Text>
            <View style={styles.graphRow}>
              {dailyTrend.map((height, index) => (
                <View key={`d-${index}`} style={styles.graphCol}>
                  <View style={styles.graphBarTrack}>
                    <View style={[styles.graphBarFill, { height: `${height}%` }]} />
                  </View>
                  <Text style={styles.graphLabel}>{`D${index + 1}`}</Text>
                </View>
              ))}
            </View>
          </AppCard>

          <AppCard style={styles.graphCard}>
            <Text style={styles.sectionTitle}>Weekly trend (activity score)</Text>
            <View style={styles.graphRow}>
              {weeklyTrend.map((height, index) => (
                <View key={`w-${index}`} style={styles.graphCol}>
                  <View style={styles.graphBarTrack}>
                    <View style={[styles.graphBarFill, { height: `${height}%` }]} />
                  </View>
                  <Text style={styles.graphLabel}>{`W${index + 1}`}</Text>
                </View>
              ))}
            </View>
          </AppCard>

          <AppCard style={styles.graphCard}>
            <Text style={styles.sectionTitle}>Progress analytics</Text>
            <View style={styles.statGrid}>
              <View style={styles.statCard}>
                <Text style={styles.statValue}>-1.8 kg</Text>
                <Text style={styles.statLabel}>Weight trend</Text>
              </View>

              <View style={styles.statCard}>
                <Text style={styles.statValue}>7,600 avg</Text>
                <Text style={styles.statLabel}>Step trend</Text>
              </View>

              <View style={styles.statCard}>
                <Text style={styles.statValue}>13,200 kcal</Text>
                <Text style={styles.statLabel}>Calories over time</Text>
              </View>

              <View style={styles.statCard}>
                <Text style={styles.statValue}>78%</Text>
                <Text style={styles.statLabel}>Goal completion rate</Text>
              </View>
            </View>
          </AppCard>

          <AppCard style={styles.graphCard}>
            <Text style={styles.sectionTitle}>Monthly graph</Text>
            <View style={styles.graphRow}>
              {monthlyTrend.map((height, index) => (
                <View key={`m-${index}`} style={styles.graphCol}>
                  <View style={styles.graphBarTrack}>
                    <View style={[styles.graphBarFill, { height: `${height}%` }]} />
                  </View>
                  <Text style={styles.graphLabel}>{`M${index + 1}`}</Text>
                </View>
              ))}
            </View>
          </AppCard>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}