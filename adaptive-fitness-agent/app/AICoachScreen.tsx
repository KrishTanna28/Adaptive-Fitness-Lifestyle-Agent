import React from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import AppCard from "../components/ui/AppCard";
import { globalStyles } from "../theme/globalStyles";
import { styles } from "./AICoachScreen.styles";

export default function AICoachScreen() {
  return (
    <SafeAreaView style={globalStyles.screen}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          <AppCard style={styles.heroCard}>
            <Text style={styles.title}>AI Coach / Insights</Text>
            <Text style={styles.subtitle}>Your adaptive decision-making brain</Text>
          </AppCard>

          <AppCard style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>Personalized recommendations</Text>

            <View style={styles.insightItem}>
              <Text style={styles.insightTitle}>Recovery-focused day</Text>
              <Text style={styles.insightText}>
                Your weekly load is high, so the coach suggests low-intensity movement today.
              </Text>
            </View>

            <View style={styles.insightItem}>
              <Text style={styles.insightTitle}>Nutrition optimization</Text>
              <Text style={styles.insightText}>
                Increase protein by 20g to better support muscle recovery.
              </Text>
            </View>
          </AppCard>

          <AppCard style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>Adaptive behavior changes</Text>

            <View style={styles.insightItem}>
              <Text style={styles.insightTitle}>Inactivity trigger</Text>
              <Text style={styles.insightText}>
                You have been inactive for 3 days, so the coach suggests a light starter workout.
              </Text>
            </View>

            <View style={styles.insightItem}>
              <Text style={styles.insightTitle}>Sleep-aware intensity</Text>
              <Text style={styles.insightText}>
                Sleep has been low, so the coach recommends reducing workout intensity today.
              </Text>
            </View>
          </AppCard>

          <AppCard style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>Agent logic</Text>
            <Text style={styles.logicText}>
              This page is the core of your app intelligence where recommendation and adaptation
              logic can be connected to behavior, recovery, activity, and nutrition signals.
            </Text>
          </AppCard>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}