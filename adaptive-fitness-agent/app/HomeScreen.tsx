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

import { auth } from "../services/firebase";
import {
  getUserFriendlyErrorMessage,
  useAppAlert,
} from "../components/ui/AppAlert";
import AppButton from "../components/ui/AppButton";
import AppCard from "../components/ui/AppCard";
import AppTextField from "../components/ui/AppTextField";
import { globalStyles } from "../theme/globalStyles";
import { styles } from "./HomeScreen.styles";

type HomeScreenProps = {
  user: User;
};

export default function HomeScreen({ user }: HomeScreenProps) {
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
          <AppCard variant="tinted" style={styles.heroCard}>
            <Text style={styles.eyebrow}>Today's focus</Text>
            <Text style={styles.title}>You're signed in and ready to train.</Text>
            <Text style={styles.subtitle}>
              Keep the momentum light, steady, and consistent.
            </Text>
          </AppCard>

          <AppCard style={styles.profileCard}>
            <Text style={styles.sectionLabel}>Welcome {user.displayName || "back"}!</Text>
            <Text style={styles.email}>{user.email}</Text>
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
      </ScrollView>
    </SafeAreaView>
  );
}
