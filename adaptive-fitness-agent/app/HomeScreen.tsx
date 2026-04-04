import React from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { signOut, type User } from "firebase/auth/react-native";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

import { auth } from "../services/firebase";
import {
  getUserFriendlyErrorMessage,
  useAppAlert,
} from "../components/ui/AppAlert";
import AppButton from "../components/ui/AppButton";
import AppCard from "../components/ui/AppCard";
import { globalStyles } from "../theme/globalStyles";
import { styles } from "./HomeScreen.styles";

type HomeScreenProps = {
  user: User;
};

export default function HomeScreen({ user }: HomeScreenProps) {
  const { showAlert } = useAppAlert();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      await GoogleSignin.signOut();
        } catch (error) {
      const message = getUserFriendlyErrorMessage(
        error,
        "We couldn't log you out right now. Please try again.",
      );

      showAlert({
        title: "Couldn't log out",
        message,
        variant: "error",
      });
    }
  };

  return (
    <SafeAreaView style={globalStyles.screen}>
      <View style={[globalStyles.content, styles.container]}>
        <AppCard variant="tinted" style={styles.heroCard}>
          <Text style={styles.eyebrow}>Today’s focus</Text>
          <Text style={styles.title}>You’re signed in and ready to train.</Text>
          <Text style={styles.subtitle}>
            Keep the momentum light, steady, and consistent.
          </Text>
        </AppCard>

        <AppCard style={styles.profileCard}>
          <Text style={styles.sectionLabel}>Logged in as</Text>
          <Text style={styles.email}>{user.email}</Text>

          <View style={styles.pillRow}>
            <View style={[styles.pill, styles.workoutPill]}>
              <Text style={styles.pillText}>Strength</Text>
            </View>
            <View style={[styles.pill, styles.calmPill]}>
              <Text style={styles.pillText}>Recovery</Text>
            </View>
          </View>
        </AppCard>

        <View style={styles.statsRow}>
          <AppCard style={styles.statCard}>
            <Text style={styles.statValue}>24</Text>
            <Text style={styles.statLabel}>Min target</Text>
          </AppCard>

          <AppCard style={styles.statCard}>
            <Text style={styles.statValue}>Easy</Text>
            <Text style={styles.statLabel}>Intensity</Text>
          </AppCard>
        </View>

        <AppButton title="Log out" onPress={handleLogout} />
      </View>
    </SafeAreaView>
  );
}
