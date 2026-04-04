import { StyleSheet } from "react-native";
import { appTheme } from "../theme/designSystem";

export const styles = StyleSheet.create({
  card: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderRadius: appTheme.radii.lg,
    padding: appTheme.spacing.lg,
    ...appTheme.shadows.soft,
  },
  form: {
    gap: appTheme.spacing.md,
  },
  fieldGroup: {
    gap: appTheme.spacing.xs,
  },
  label: {
    ...appTheme.typography.label,
    color: appTheme.colors.mutedText,
  },
  input: {
    minHeight: 56,
    borderRadius: appTheme.radii.md,
    backgroundColor: appTheme.colors.background,
    borderWidth: 1,
    borderColor: appTheme.colors.secondary,
    paddingHorizontal: appTheme.spacing.md,
    color: appTheme.colors.text,
    fontSize: 15,
    fontWeight: "500",
  },
  primaryButton: {
    minHeight: 56,
    backgroundColor: appTheme.colors.primary,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    ...appTheme.shadows.medium,
  },
  primaryButtonText: {
    ...appTheme.typography.body,
    color: appTheme.colors.text,
    fontWeight: "700",
  },
  switchButton: {
    alignItems: "center",
    paddingVertical: appTheme.spacing.xs,
  },
  switchText: {
    ...appTheme.typography.body,
    color: appTheme.colors.mutedText,
    textAlign: "center",
  },
  switchContainer: {
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
},
switchButtonText: {
  color: "#007AFF",
  fontSize: 14,
  fontWeight: "bold",
},
  googleButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    minHeight: 56,
    backgroundColor: appTheme.colors.card,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: appTheme.colors.secondary,
    opacity: 1,
  },
  googleButtonDisabled: {
    opacity: 0.6,
  },
  googleButtonText: {
    marginLeft: 10,
    ...appTheme.typography.body,
    color: appTheme.colors.text,
    fontWeight: "600",
  },
  
});
