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
  heroTopRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: appTheme.spacing.md,
  },
  heroTextWrap: {
    flex: 1,
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

  datePickerBlock: {
    gap: appTheme.spacing.xs,
    marginTop: appTheme.spacing.xs,
  },
  datePickerTrigger: {
    minHeight: 48,
    borderRadius: appTheme.radii.md,
    borderWidth: 1,
    borderColor: appTheme.colors.border,
    backgroundColor: appTheme.colors.inputBackground,
    paddingHorizontal: appTheme.spacing.md,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: appTheme.spacing.sm,
  },
  datePickerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: appTheme.spacing.sm,
    flexShrink: 1,
  },
  datePickerValue: {
    ...appTheme.typography.body,
    color: appTheme.colors.text,
    fontWeight: "700",
  },

  sectionCard: {
    gap: appTheme.spacing.md,
  },
  sectionTitle: {
    ...appTheme.typography.subheading,
    color: appTheme.colors.text,
  },
  emptyText: {
    ...appTheme.typography.label,
    color: appTheme.colors.mutedText,
  },

  mealHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: appTheme.spacing.md,
  },
  addMealButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    borderRadius: appTheme.radii.pill,
    borderWidth: 1,
    borderColor: appTheme.colors.border,
    backgroundColor: appTheme.colors.inputBackground,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  addMealText: {
    ...appTheme.typography.caption,
    color: appTheme.colors.text,
    fontWeight: "700",
  },

  entriesList: {
    gap: appTheme.spacing.sm,
  },
  entryRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: appTheme.spacing.md,
    paddingBottom: appTheme.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: appTheme.colors.border,
  },
  entryLeft: {
    flex: 1,
    gap: 2,
  },
  entryName: {
    ...appTheme.typography.body,
    color: appTheme.colors.text,
    fontWeight: "700",
  },
  entryMeta: {
    ...appTheme.typography.caption,
    color: appTheme.colors.mutedText,
  },
  entryRight: {
    alignItems: "flex-end",
    gap: 2,
  },
  entryCalories: {
    ...appTheme.typography.body,
    color: appTheme.colors.text,
    fontWeight: "700",
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(32, 32, 34, 0.34)",
    justifyContent: "center",
    paddingHorizontal: appTheme.spacing.lg,
  },
  modalBackdrop: {
    ...StyleSheet.absoluteFillObject,
  },
  modalCard: {
    maxHeight: "88%",
    borderRadius: appTheme.radii.lg,
    borderWidth: 1,
    borderColor: appTheme.colors.border,
    backgroundColor: appTheme.colors.cardAlt,
    overflow: "hidden",
  },
  modalContent: {
    padding: appTheme.spacing.lg,
    gap: appTheme.spacing.md,
  },
  modalTitle: {
    ...appTheme.typography.subheading,
    color: appTheme.colors.text,
  },

  fieldLabel: {
    ...appTheme.typography.label,
    color: appTheme.colors.mutedText,
  },

  block: {
    gap: appTheme.spacing.sm,
  },

  searchButtonWrap: {
    marginTop: 2,
  },

  searchResultsWrap: {
    gap: appTheme.spacing.sm,
    marginTop: 4,
  },

  resultRow: {
    borderRadius: appTheme.radii.md,
    borderWidth: 1,
    borderColor: appTheme.colors.border,
    backgroundColor: appTheme.colors.inputBackground,
    paddingHorizontal: 12,
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: appTheme.spacing.md,
  },
  resultRowActive: {
    borderColor: appTheme.colors.secondary,
    backgroundColor: appTheme.colors.card,
  },
  resultLeft: {
    flex: 1,
    minWidth: 0,
    gap: 2,
  },
  resultTitle: {
    ...appTheme.typography.body,
    color: appTheme.colors.text,
    fontWeight: "700",
  },
  resultMeta: {
    ...appTheme.typography.caption,
    color: appTheme.colors.mutedText,
  },

  manualRow: {
    flexDirection: "row",
    gap: appTheme.spacing.sm,
  },
  manualCell: {
    flex: 1,
  },

  modeRow: {
    flexDirection: "row",
    gap: 10,
  },
  modeButton: {
    flex: 1,
    borderRadius: appTheme.radii.md,
    borderWidth: 1,
    borderColor: appTheme.colors.border,
    backgroundColor: appTheme.colors.inputBackground,
    paddingVertical: 10,
    alignItems: "center",
  },
  modeButtonActive: {
    backgroundColor: appTheme.colors.card,
    borderColor: appTheme.colors.secondary,
  },
  modeButtonText: {
    ...appTheme.typography.body,
    color: appTheme.colors.mutedText,
    fontWeight: "600",
  },
  modeButtonTextActive: {
    color: appTheme.colors.text,
    fontWeight: "700",
  },

  modalActions: {
    gap: appTheme.spacing.sm,
    marginTop: appTheme.spacing.sm,
    marginBottom: 4,
  },
});