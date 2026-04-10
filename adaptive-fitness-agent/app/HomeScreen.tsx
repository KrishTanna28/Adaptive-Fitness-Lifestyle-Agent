import React, { useMemo, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  EmailAuthProvider,
  GoogleAuthProvider,
  linkWithCredential,
  reauthenticateWithCredential,
  signOut,
  type User,
} from "firebase/auth/react-native";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { Apple, Flame, Lightbulb, Target } from "lucide-react-native";

import { auth } from "../services/firebase";
import {
  getUserFriendlyErrorMessage,
  useAppAlert,
} from "../components/ui/AppAlert";
import AppButton from "../components/ui/AppButton";
import AppCard from "../components/ui/AppCard";
import AppTextField from "../components/ui/AppTextField";
import type { LiveStepCounter } from "../hooks/useLiveStepCounter";
import { appTheme } from "../theme/designSystem";
import { globalStyles } from "../theme/globalStyles";
import { styles } from "./HomeScreen.styles";

type HomeScreenProps = {
  user: User;
  liveStepCounter: LiveStepCounter;
};

export default function HomeScreen({ user, liveStepCounter }: HomeScreenProps) {
  const { showAlert } = useAppAlert();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSavingPassword, setIsSavingPassword] = useState(false);
  const [hasPasswordLogin, setHasPasswordLogin] = useState(
    user.providerData.some((provider) => provider.providerId === "password"),
  );

  const hasGoogleLogin = useMemo(
    () => user.providerData.some((provider) => provider.providerId === "google.com"),
    [user.providerData],
  );

  const shouldShowPasswordSetup =
    hasGoogleLogin && !hasPasswordLogin && Boolean(user.email);

  const goalProgressPercent = Math.round(liveStepCounter.progress * 100);
  const goalProgressPercentage = `${goalProgressPercent}%` as `${number}%`;
  const stepCountText = liveStepCounter.isLoading
    ? "Loading..."
    : liveStepCounter.stepsToday.toLocaleString();
  const stepGoalText = `/${liveStepCounter.goal.toLocaleString()} steps`;
  const suggestionText =
    liveStepCounter.remainingSteps > 0
      ? `Walk ${liveStepCounter.remainingSteps.toLocaleString()} more steps to reach your goal.`
      : "Daily goal reached. Great consistency today.";

  const linkEmailPassword = async (password: string) => {
    const currentUser = auth.currentUser;

    if (!currentUser?.email) {
      throw new Error("Email not available.");
    }

    const credential = EmailAuthProvider.credential(currentUser.email, password);
    await linkWithCredential(currentUser, credential);
  };

  const reauthenticateGoogleUser = async () => {
    await GoogleSignin.hasPlayServices();

    let googleResult;

    try {
      googleResult = await GoogleSignin.signInSilently();
    } catch {
      googleResult = await GoogleSignin.signIn();
    }

    const idToken = googleResult.data?.idToken;

    if (!idToken || !auth.currentUser) {
      throw new Error("We couldn't verify your Google account. Please try again.");
    }

    const googleCredential = GoogleAuthProvider.credential(idToken);
    await reauthenticateWithCredential(auth.currentUser, googleCredential);
  };

  const handleAddPassword = async () => {
    if (!user.email) {
      showAlert({
        title: "Email not available",
        message: "We couldn't find an email for this account.",
      });
      return;
    }

    if (newPassword.length < 6) {
      showAlert({
        title: "Choose a stronger password",
        message: "Your password should be at least 6 characters long.",
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      showAlert({
        title: "Passwords don't match",
        message: "Please make sure both password fields are the same.",
      });
      return;
    }

    try {
      setIsSavingPassword(true);

      try {
        await linkEmailPassword(newPassword);
      } catch (error) {
        const needsRecentLogin =
          error instanceof Error &&
          /requires-recent-login|recent login/i.test(error.message);

        if (!needsRecentLogin) {
          throw error;
        }

        await reauthenticateGoogleUser();
        await linkEmailPassword(newPassword);
      }

      setHasPasswordLogin(true);
      setNewPassword("");
      setConfirmPassword("");

      showAlert({
        title: "Password added",
        message:
          "You can now sign in with either Google or your email and password.",
      });
    } catch (error) {
      const message = getUserFriendlyErrorMessage(
        error,
        "We couldn't add a password right now. Please try again.",
      );

      showAlert({
        title: "Couldn't add password",
        message,
      });
    } finally {
      setIsSavingPassword(false);
    }
  };

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
      });
    }
  };

  return (
    <SafeAreaView style={globalStyles.screen}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.container}>
          <AppCard style={styles.profileCard}>
            <Text style={styles.sectionLabel}>Welcome {user.displayName || "back"}!</Text>
          </AppCard>

          <AppCard style={styles.stepsCard}>
            <View style={styles.stepsRow}>
              <View style={styles.stepsInfo}>
                <Text style={styles.metricValue}>{stepCountText}</Text>
                <View>
                  <Text style={styles.metricLabel}>{stepGoalText}</Text>
                </View>
              </View>

              <View style={styles.stepsProgressWrap}>
                <View style={styles.progressTrack}>
                  <View style={[styles.progressFill, { width: goalProgressPercentage }]} />
                </View>
                <Text style={styles.progressCaption}>{goalProgressPercentage}</Text>
              </View>
            </View>
          </AppCard>

          <AppCard style={styles.metricsCard}>
            <Text style={styles.metricsTitle}>Daily snapshot</Text>
            <View style={styles.metricsGrid}>
              <View style={styles.metricItem}>
                <View style={styles.metricValueRow}>
                  <Flame size={18} color={appTheme.colors.text} strokeWidth={2.2} />
                  <Text style={styles.metricValue}>{liveStepCounter.caloriesBurned} kcal</Text>
                </View>
                <Text style={styles.metricLabel}>Calories burned</Text>
              </View>

              <View style={styles.metricItem}>
                <View style={styles.metricValueRow}>
                  <Apple size={18} color={appTheme.colors.text} strokeWidth={2.2} />
                  <Text style={styles.metricValue}>1650 kcal</Text>
                </View>
                <Text style={styles.metricLabel}>Calories intake</Text>
              </View>
            </View>

            <View style={styles.goalSection}>
              <Text style={styles.metricLabel}>Goal progress</Text>
              <View style={styles.progressTrack}>
                <View style={[styles.progressFill, { width: goalProgressPercentage }]} />
              </View>
              <View style={styles.progressValueRow}>
                <Target size={16} color={appTheme.colors.mutedText} strokeWidth={2.2} />
                <Text style={styles.progressCaption}>{goalProgressPercentage} of daily goal</Text>
              </View>
            </View>
          </AppCard>

          <AppCard style={styles.suggestionCard}>
            <View style={styles.suggestionLabelRow}>
              <Lightbulb size={16} color={appTheme.colors.mutedText} strokeWidth={2.2} />
              <Text style={styles.suggestionLabel}>AI Suggestion</Text>
            </View>
            <Text style={styles.suggestionText}>{suggestionText}</Text>
          </AppCard>

          {shouldShowPasswordSetup ? (
            <AppCard style={styles.passwordCard}>
              <Text style={styles.passwordTitle}>Add password</Text>
              <Text style={styles.passwordSubtitle}>
                Add a password once so you can also log in later with email and
                password, not only Google.
              </Text>

              <AppTextField
                label="New password"
                placeholder="Create a password"
                placeholderTextColor="#736A6A"
                value={newPassword}
                onChangeText={setNewPassword}
                isPasswordField
              />

              <AppTextField
                label="Confirm password"
                placeholder="Re-enter your password"
                placeholderTextColor="#736A6A"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                isPasswordField
              />

              <AppButton
                title="Save password"
                onPress={handleAddPassword}
                loading={isSavingPassword}
                disabled={isSavingPassword}
              />
            </AppCard>
          ) : null}

          <AppButton title="Log out" onPress={handleLogout} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
