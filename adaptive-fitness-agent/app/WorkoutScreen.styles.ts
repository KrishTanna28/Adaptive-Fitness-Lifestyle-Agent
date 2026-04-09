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
  suggestionItem: {
    gap: appTheme.spacing.xs,
    paddingBottom: appTheme.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: appTheme.colors.border,
  },
  suggestionName: {
    ...appTheme.typography.body,
    color: appTheme.colors.text,
    fontWeight: "700",
  },
  suggestionMeta: {
    ...appTheme.typography.caption,
    color: appTheme.colors.mutedText,
  },
  categoryRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: appTheme.spacing.sm,
  },
  categoryChip: {
    borderRadius: appTheme.radii.pill,
    backgroundColor: appTheme.colors.background,
    paddingHorizontal: appTheme.spacing.md,
    paddingVertical: appTheme.spacing.xs,
  },
  categoryChipText: {
    ...appTheme.typography.caption,
    color: appTheme.colors.text,
    fontWeight: "700",
  },
  detailsRow: {
    gap: appTheme.spacing.xs,
  },
  exerciseName: {
    ...appTheme.typography.body,
    color: appTheme.colors.text,
    fontWeight: "700",
  },
  exerciseMeta: {
    ...appTheme.typography.caption,
    color: appTheme.colors.mutedText,
  },
  animationPreview: {
    borderRadius: appTheme.radii.md,
    backgroundColor: appTheme.colors.background,
    paddingVertical: appTheme.spacing.xl,
    alignItems: "center",
    justifyContent: "center",
  },
  animationText: {
    ...appTheme.typography.label,
    color: appTheme.colors.mutedText,
  },
});