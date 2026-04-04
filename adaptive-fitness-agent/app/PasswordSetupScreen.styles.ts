import { StyleSheet } from "react-native";
import { appTheme } from "../theme/designSystem";

export const styles = StyleSheet.create({
  scrollContent: {
    paddingHorizontal: appTheme.spacing.lg,
    paddingVertical: appTheme.spacing.xl,
  },
  container: {
    gap: appTheme.spacing.lg,
  },
  heroCard: {
    gap: appTheme.spacing.sm,
  },
  eyebrow: {
    ...appTheme.typography.label,
    color: appTheme.colors.text,
  },
  title: {
    ...appTheme.typography.heading,
    color: appTheme.colors.text,
  },
  subtitle: {
    ...appTheme.typography.body,
    color: appTheme.colors.mutedText,
  },
  formCard: {
    gap: appTheme.spacing.md,
  },
  sectionLabel: {
    ...appTheme.typography.label,
    color: appTheme.colors.mutedText,
  },
  email: {
    ...appTheme.typography.subheading,
    color: appTheme.colors.text,
    marginBottom: appTheme.spacing.xs,
  },
});
