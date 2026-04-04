import { StyleSheet } from "react-native";
import { appTheme } from "../theme/designSystem";

export const styles = StyleSheet.create({
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
