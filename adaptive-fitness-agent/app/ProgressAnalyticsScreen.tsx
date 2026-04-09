import React from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import AppCard from "../components/ui/AppCard";
import { globalStyles } from "../theme/globalStyles";
import { styles } from "./ProgressAnalyticsScreen.styles";

const weeklyTrend = [58, 66, 71, 62, 79, 83, 88];
const monthlyTrend = [45, 52, 67, 61, 70, 76, 81, 73];

export default function ProgressAnalyticsScreen() {
  return (
    <SafeAreaView style={globalStyles.screen}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          <AppCard style={styles.heroCard}>
            <Text style={styles.title}>Progress / Analytics</Text>
            <Text style={styles.subtitle}>Long-term health and performance tracking</Text>
          </AppCard>

          <View style={styles.statGrid}>
            <AppCard style={styles.statCard}>
              <Text style={styles.statValue}>-1.8 kg</Text>
              <Text style={styles.statLabel}>Weight trend</Text>
            </AppCard>

            <AppCard style={styles.statCard}>
              <Text style={styles.statValue}>7,600 avg</Text>
              <Text style={styles.statLabel}>Step trend</Text>
            </AppCard>

            <AppCard style={styles.statCard}>
              <Text style={styles.statValue}>13,200 kcal</Text>
              <Text style={styles.statLabel}>Calories over time</Text>
            </AppCard>

            <AppCard style={styles.statCard}>
              <Text style={styles.statValue}>78%</Text>
              <Text style={styles.statLabel}>Goal completion rate</Text>
            </AppCard>
          </View>

          <AppCard style={styles.graphCard}>
            <Text style={styles.sectionTitle}>Weekly graph</Text>
            <View style={styles.graphRow}>
              {weeklyTrend.map((height, index) => (
                <View key={`pw-${index}`} style={styles.graphCol}>
                  <View style={styles.graphBarTrack}>
                    <View style={[styles.graphBarFill, { height: `${height}%` }]} />
                  </View>
                  <Text style={styles.graphLabel}>{`W${index + 1}`}</Text>
                </View>
              ))}
            </View>
          </AppCard>

          <AppCard style={styles.graphCard}>
            <Text style={styles.sectionTitle}>Monthly graph</Text>
            <View style={styles.graphRow}>
              {monthlyTrend.map((height, index) => (
                <View key={`pm-${index}`} style={styles.graphCol}>
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