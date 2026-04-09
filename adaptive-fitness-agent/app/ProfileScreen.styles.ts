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
  headerCard: {
    gap: appTheme.spacing.xs,
  },
  title: {
    ...appTheme.typography.heading,
    color: appTheme.colors.text,
  },
  subtitle: {
    ...appTheme.typography.body,
    color: appTheme.colors.mutedText,
  },
  detailsCard: {
    gap: appTheme.spacing.md,
  },
  row: {
    gap: appTheme.spacing.xs,
  },
  label: {
    ...appTheme.typography.label,
    color: appTheme.colors.mutedText,
  },
  value: {
    ...appTheme.typography.subheading,
    color: appTheme.colors.text,
  },
});