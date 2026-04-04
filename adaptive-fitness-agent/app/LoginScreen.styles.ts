import { StyleSheet } from "react-native";
import { appTheme } from "../theme/designSystem";

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: appTheme.colors.background,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: appTheme.spacing.lg,
    paddingVertical: appTheme.spacing.xl,
    gap: appTheme.spacing.lg,
  },
  heroCard: {
    backgroundColor: appTheme.colors.card,
    borderRadius: appTheme.radii.lg,
    padding: appTheme.spacing.lg,
    gap: appTheme.spacing.sm,
    ...appTheme.shadows.soft,
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
  tagRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: appTheme.spacing.sm,
    marginTop: appTheme.spacing.sm,
  },
  tag: {
    backgroundColor: appTheme.colors.cardAlt,
    paddingHorizontal: appTheme.spacing.md,
    paddingVertical: appTheme.spacing.xs,
    borderRadius: appTheme.radii.pill,
  },
  primaryTag: {
    backgroundColor: appTheme.colors.primary,
  },
  tagText: {
    ...appTheme.typography.caption,
    color: appTheme.colors.text,
  },
  primaryTagText: {
    ...appTheme.typography.caption,
    color: appTheme.colors.text,
    fontWeight: "700",
  },
  loadingText: {
    ...appTheme.typography.label,
    textAlign: "center",
  },
});
