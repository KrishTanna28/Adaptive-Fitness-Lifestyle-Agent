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
  sectionCard: {
    gap: appTheme.spacing.md,
  },
  sectionTitle: {
    ...appTheme.typography.subheading,
    color: appTheme.colors.text,
  },
  insightItem: {
    gap: appTheme.spacing.xs,
    paddingBottom: appTheme.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: appTheme.colors.border,
  },
  insightTitle: {
    ...appTheme.typography.body,
    color: appTheme.colors.text,
    fontWeight: "700",
  },
  insightText: {
    ...appTheme.typography.caption,
    color: appTheme.colors.mutedText,
  },
  logicText: {
    ...appTheme.typography.body,
    color: appTheme.colors.text,
  },
});