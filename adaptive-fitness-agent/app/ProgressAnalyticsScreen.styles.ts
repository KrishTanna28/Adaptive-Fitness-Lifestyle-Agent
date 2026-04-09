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
  statGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    rowGap: appTheme.spacing.md,
    columnGap: appTheme.spacing.md,
  },
  statCard: {
    width: "47%",
    gap: appTheme.spacing.xs,
  },
  statValue: {
    ...appTheme.typography.subheading,
    color: appTheme.colors.text,
  },
  statLabel: {
    ...appTheme.typography.label,
    color: appTheme.colors.mutedText,
  },
  graphCard: {
    gap: appTheme.spacing.md,
  },
  sectionTitle: {
    ...appTheme.typography.subheading,
    color: appTheme.colors.text,
  },
  graphRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    gap: appTheme.spacing.xs,
    height: 120,
  },
  graphCol: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    gap: appTheme.spacing.xs,
  },
  graphBarTrack: {
    width: "100%",
    height: 84,
    backgroundColor: appTheme.colors.background,
    borderRadius: appTheme.radii.sm,
    justifyContent: "flex-end",
    overflow: "hidden",
  },
  graphBarFill: {
    width: "100%",
    backgroundColor: appTheme.colors.primary,
    borderRadius: appTheme.radii.sm,
  },
  graphLabel: {
    ...appTheme.typography.caption,
    color: appTheme.colors.mutedText,
  },
});