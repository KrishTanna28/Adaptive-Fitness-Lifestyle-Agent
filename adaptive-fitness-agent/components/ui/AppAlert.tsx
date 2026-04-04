import React, { ReactNode, createContext, useContext, useState } from "react";
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { appTheme } from "../../theme/designSystem";

type AlertVariant = "info" | "success" | "warning" | "error";
type AlertActionStyle = "primary" | "secondary";

export type AppAlertAction = {
  label: string;
  onPress?: () => void;
  style?: AlertActionStyle;
};

export type AppAlertOptions = {
  title: string;
  message?: string;
  variant?: AlertVariant;
  actions?: AppAlertAction[];
  dismissible?: boolean;
};

type AppAlertContextValue = {
  showAlert: (options: AppAlertOptions) => void;
  hideAlert: () => void;
};

type AppAlertProviderProps = {
  children: ReactNode;
};

type StoredAlert = {
  title: string;
  message?: string;
  variant: AlertVariant;
  actions: AppAlertAction[];
  dismissible: boolean;
};

const AppAlertContext = createContext<AppAlertContextValue | null>(null);

const variantConfig: Record<
  AlertVariant,
  {
    chipLabel: string;
    chipBackground: string;
    chipText: string;
  }
> = {
  info: {
    chipLabel: "Notice",
    chipBackground: appTheme.colors.card,
    chipText: appTheme.colors.text,
  },
  success: {
    chipLabel: "All set",
    chipBackground: "#DDF2D7",
    chipText: "#4F7D49",
  },
  warning: {
    chipLabel: "Please check",
    chipBackground: appTheme.colors.primary,
    chipText: appTheme.colors.text,
  },
  error: {
    chipLabel: "Something went wrong",
    chipBackground: "#F4DCE2",
    chipText: "#A14A5E",
  },
};

const friendlyErrorMap: Array<{
  match: RegExp;
  message: string;
}> = [
  {
    match: /invalid-credential|wrong-password|user-not-found|invalid-login-credentials/i,
    message: "That email or password doesn't look right. Please try again.",
  },
  {
    match: /email-already-in-use/i,
    message: "That email is already being used. Try logging in instead.",
  },
  {
    match: /invalid-email/i,
    message: "Please enter a valid email address.",
  },
  {
    match: /weak-password/i,
    message: "Please choose a stronger password with at least 6 characters.",
  },
  {
    match: /network-request-failed|network error|timeout/i,
    message: "We couldn't connect right now. Please check your internet and try again.",
  },
  {
    match: /too-many-requests/i,
    message: "Too many attempts were made. Please wait a moment and try again.",
  },
  {
    match: /play services/i,
    message: "Google Play Services is not available on this device right now.",
  },
  {
    match: /sign_in_cancelled|cancelled|canceled/i,
    message: "The sign-in was cancelled before it finished.",
  },
];

export function getUserFriendlyErrorMessage(
  error: unknown,
  fallback = "Something went wrong. Please try again.",
) {
  const rawMessage =
    error instanceof Error
      ? error.message
      : typeof error === "string"
        ? error
        : "";

  const matchedError = friendlyErrorMap.find(({ match }) => match.test(rawMessage));
  return matchedError?.message ?? fallback;
}

export function AppAlertProvider({ children }: AppAlertProviderProps) {
  const [alert, setAlert] = useState<StoredAlert | null>(null);

  const hideAlert = () => {
    setAlert(null);
  };

  const showAlert = (options: AppAlertOptions) => {
    setAlert({
      title: options.title,
      message: options.message,
      variant: options.variant ?? "info",
      actions:
        options.actions && options.actions.length > 0
          ? options.actions.slice(0, 2)
          : [{ label: "Okay", style: "primary" }],
      dismissible: options.dismissible ?? true,
    });
  };

  const handleActionPress = (action: AppAlertAction) => {
    hideAlert();
    action.onPress?.();
  };

  const activeVariant = alert ? variantConfig[alert.variant] : variantConfig.info;

  return (
    <AppAlertContext.Provider value={{ showAlert, hideAlert }}>
      {children}

      <Modal
        animationType="fade"
        transparent
        visible={Boolean(alert)}
        onRequestClose={() => {
          if (alert?.dismissible) {
            hideAlert();
          }
        }}
      >
        <View style={styles.overlay}>
          <Pressable
            style={StyleSheet.absoluteFill}
            onPress={() => {
              if (alert?.dismissible) {
                hideAlert();
              }
            }}
          />

          {alert ? (
            <View style={styles.card}>
              <View style={styles.content}>
                <View
                  style={[
                    styles.chip,
                    { backgroundColor: activeVariant.chipBackground },
                  ]}
                >
                  <Text style={[styles.chipText, { color: activeVariant.chipText }]}>
                    {activeVariant.chipLabel}
                  </Text>
                </View>

                <Text style={styles.title}>{alert.title}</Text>

                {alert.message ? (
                  <Text style={styles.message}>{alert.message}</Text>
                ) : null}

                <View
                  style={[
                    styles.actionsRow,
                    alert.actions.length === 1 && styles.singleActionRow,
                  ]}
                >
                  {alert.actions.map((action) => {
                    const isPrimary = (action.style ?? "primary") === "primary";

                    return (
                      <TouchableOpacity
                        key={action.label}
                        activeOpacity={0.9}
                        onPress={() => handleActionPress(action)}
                        style={[
                          styles.actionButton,
                          isPrimary ? styles.primaryButton : styles.secondaryButton,
                        ]}
                      >
                        <Text
                          style={[
                            styles.actionButtonText,
                            isPrimary
                              ? styles.primaryButtonText
                              : styles.secondaryButtonText,
                          ]}
                        >
                          {action.label}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>
            </View>
          ) : null}
        </View>
      </Modal>
    </AppAlertContext.Provider>
  );
}

export function useAppAlert() {
  const context = useContext(AppAlertContext);

  if (!context) {
    throw new Error("useAppAlert must be used inside AppAlertProvider.");
  }

  return context;
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(32, 32, 34, 0.28)",
    justifyContent: "center",
    paddingHorizontal: appTheme.spacing.lg,
  },
  card: {
    backgroundColor: appTheme.colors.cardAlt,
    borderRadius: appTheme.radii.lg,
    borderWidth: 1,
    borderColor: appTheme.colors.border,
    ...appTheme.shadows.medium,
  },
  content: {
    padding: appTheme.spacing.lg,
    gap: appTheme.spacing.md,
  },
  chip: {
    alignSelf: "flex-start",
    borderRadius: appTheme.radii.pill,
    paddingHorizontal: appTheme.spacing.md,
    paddingVertical: appTheme.spacing.xs,
  },
  chipText: {
    ...appTheme.typography.caption,
    fontWeight: "700",
  },
  title: {
    ...appTheme.typography.subheading,
    color: appTheme.colors.text,
  },
  message: {
    ...appTheme.typography.body,
    color: appTheme.colors.mutedText,
  },
  actionsRow: {
    flexDirection: "row",
    gap: appTheme.spacing.sm,
    marginTop: appTheme.spacing.xs,
  },
  singleActionRow: {
    justifyContent: "flex-end",
  },
  actionButton: {
    flex: 1,
    minHeight: 54,
    borderRadius: appTheme.radii.md,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: appTheme.spacing.md,
  },
  primaryButton: {
    backgroundColor: appTheme.colors.primary,
    ...appTheme.shadows.soft,
  },
  secondaryButton: {
    backgroundColor: appTheme.colors.card,
    borderWidth: 1,
    borderColor: appTheme.colors.border,
  },
  actionButtonText: {
    ...appTheme.typography.body,
    fontWeight: "700",
  },
  primaryButtonText: {
    color: appTheme.colors.text,
  },
  secondaryButtonText: {
    color: appTheme.colors.text,
  },
});
