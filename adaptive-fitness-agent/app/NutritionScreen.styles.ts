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
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: appTheme.spacing.md,
  },
  rowLabel: {
    ...appTheme.typography.body,
    color: appTheme.colors.text,
    fontWeight: "700",
  },
  rowMeta: {
    ...appTheme.typography.caption,
    color: appTheme.colors.mutedText,
  },
  macroGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    rowGap: appTheme.spacing.md,
    columnGap: appTheme.spacing.md,
  },
  macroItem: {
    width: "47%",
    gap: appTheme.spacing.xs,
  },
  macroValue: {
    ...appTheme.typography.subheading,
    color: appTheme.colors.text,
  },
  macroLabel: {
    ...appTheme.typography.label,
    color: appTheme.colors.mutedText,
  },
  aiSuggestion: {
    ...appTheme.typography.body,
    color: appTheme.colors.text,
  },
  noteText: {
    ...appTheme.typography.label,
    color: appTheme.colors.mutedText,
  },
});