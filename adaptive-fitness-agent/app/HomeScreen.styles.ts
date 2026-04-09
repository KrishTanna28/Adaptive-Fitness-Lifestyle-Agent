import { StyleSheet } from "react-native";
import { appTheme } from "../theme/designSystem";

export const styles = StyleSheet.create({
  container: {
    gap: appTheme.spacing.lg,
  },
  stepsCard: {
    gap: appTheme.spacing.sm,
  },
  stepsRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: appTheme.spacing.md,
  },
  stepsInfo: {
    gap: appTheme.spacing.xs,
  },
  stepsProgressWrap: {
    flex: 1,
    maxWidth: 170,
    alignItems: "flex-end",
    gap: appTheme.spacing.xs,
  },
  metricsCard: {
    gap: appTheme.spacing.md,
  },
  metricsTitle: {
    ...appTheme.typography.subheading,
    color: appTheme.colors.text,
  },
  metricsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    rowGap: appTheme.spacing.md,
    columnGap: appTheme.spacing.md,
  },
  metricItem: {
    width: "47%",
    gap: appTheme.spacing.xs,
  },
  metricValueRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: appTheme.spacing.xs,
  },
  metricLabelRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: appTheme.spacing.xs,
  },
  metricValue: {
    ...appTheme.typography.subheading,
    color: appTheme.colors.text,
  },
  metricLabel: {
    ...appTheme.typography.label,
    color: appTheme.colors.mutedText,
  },
  goalSection: {
    gap: appTheme.spacing.xs,
  },
  progressTrack: {
    width: "100%",
    height: 10,
    borderRadius: appTheme.radii.pill,
    backgroundColor: appTheme.colors.border,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: appTheme.radii.pill,
    backgroundColor: appTheme.colors.primary,
  },
  progressCaption: {
    ...appTheme.typography.caption,
    color: appTheme.colors.mutedText,
    textAlign: "right",
  },
  progressValueRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: appTheme.spacing.xs,
  },
  suggestionCard: {
    gap: appTheme.spacing.xs,
  },
  suggestionLabelRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: appTheme.spacing.xs,
  },
  suggestionLabel: {
    ...appTheme.typography.label,
    color: appTheme.colors.mutedText,
  },
  suggestionText: {
    ...appTheme.typography.body,
    color: appTheme.colors.text,
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
  },
  subtitle: {
    ...appTheme.typography.body,
    color: appTheme.colors.mutedText,
  },
  profileCard: {
    gap: appTheme.spacing.sm,
  },
  sectionLabel: {
    ...appTheme.typography.label,
  },
  email: {
    ...appTheme.typography.subheading,
  },
  pillRow: {
    flexDirection: "row",
    gap: appTheme.spacing.sm,
    marginTop: appTheme.spacing.sm,
  },
  pill: {
    paddingHorizontal: appTheme.spacing.md,
    paddingVertical: appTheme.spacing.xs,
    borderRadius: appTheme.radii.pill,
  },
  workoutPill: {
    backgroundColor: appTheme.colors.strength,
  },
  calmPill: {
    backgroundColor: appTheme.colors.yoga,
  },
  pillText: {
    ...appTheme.typography.caption,
    color: appTheme.colors.text,
    fontWeight: "700",
  },
  statsRow: {
    flexDirection: "row",
    gap: appTheme.spacing.md,
  },
  statCard: {
    flex: 1,
    gap: appTheme.spacing.xs,
  },
  statValue: {
    ...appTheme.typography.subheading,
  },
  statLabel: {
    ...appTheme.typography.label,
  },
  passwordCard: {
    gap: appTheme.spacing.md,
  },
  passwordTitle: {
    ...appTheme.typography.subheading,
    color: appTheme.colors.text,
  },
  passwordSubtitle: {
    ...appTheme.typography.body,
    color: appTheme.colors.mutedText,
  },
  scrollContent: {
    paddingHorizontal: appTheme.spacing.lg,
    paddingVertical: appTheme.spacing.xl,
  },
});
