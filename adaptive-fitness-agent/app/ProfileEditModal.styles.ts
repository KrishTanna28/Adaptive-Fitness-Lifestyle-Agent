import { StyleSheet } from "react-native";
import { appTheme } from "../theme/designSystem";

export const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(32, 32, 34, 0.34)",
    justifyContent: "center",
    paddingHorizontal: appTheme.spacing.lg,
  },
  modalBackdrop: {
    ...StyleSheet.absoluteFillObject,
  },
  modalCardWrap: {
    maxHeight: "85%",
  },
  modalCard: {
    backgroundColor: appTheme.colors.cardAlt,
    borderRadius: appTheme.radii.lg,
    borderWidth: 1,
    borderColor: appTheme.colors.border,
    ...appTheme.shadows.medium,
  },
  modalContent: {
    padding: appTheme.spacing.lg,
    gap: appTheme.spacing.md,
  },
  modalHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  modalTitle: {
    ...appTheme.typography.subheading,
    color: appTheme.colors.text,
  },
  modalCloseButton: {
    width: 36,
    height: 36,
    borderRadius: appTheme.radii.pill,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: appTheme.colors.card,
    borderWidth: 1,
    borderColor: appTheme.colors.border,
  },
  modalCloseText: {
    ...appTheme.typography.caption,
    color: appTheme.colors.text,
    fontWeight: "700",
  },
  loadingText: {
    ...appTheme.typography.caption,
    color: appTheme.colors.mutedText,
  },
  dropdownGroup: {
    gap: appTheme.spacing.xs,
    zIndex: 2,
  },
  dropdownLabel: {
    ...appTheme.typography.label,
    color: appTheme.colors.mutedText,
  },
  dropdownTrigger: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    minHeight: 54,
    borderRadius: appTheme.radii.md,
    backgroundColor: appTheme.colors.inputBackground,
    borderWidth: 1,
    borderColor: appTheme.colors.border,
    paddingHorizontal: appTheme.spacing.md,
  },
  dropdownValue: {
    ...appTheme.typography.body,
    color: appTheme.colors.text,
    flex: 1,
    paddingRight: appTheme.spacing.sm,
  },
  dropdownCaret: {
    ...appTheme.typography.caption,
    color: appTheme.colors.mutedText,
    fontWeight: "700",
  },
  dropdownMenu: {
    borderWidth: 1,
    borderColor: appTheme.colors.border,
    borderRadius: appTheme.radii.md,
    backgroundColor: appTheme.colors.inputBackground,
    overflow: "hidden",
  },
  dropdownItem: {
    borderWidth: 1,
    borderColor: "transparent",
    borderBottomColor: appTheme.colors.border,
    paddingHorizontal: appTheme.spacing.md,
    paddingVertical: appTheme.spacing.sm,
  },
  dropdownItemSelected: {
    borderColor: appTheme.colors.primary,
    backgroundColor: appTheme.colors.card,
  },
  dropdownItemText: {
    ...appTheme.typography.body,
    color: appTheme.colors.text,
  },
  dropdownItemTextSelected: {
    fontWeight: "700",
    color: appTheme.colors.text,
  },
  modalActionsRow: {
    flexDirection: "row",
    gap: appTheme.spacing.sm,
    marginTop: appTheme.spacing.xs,
  },
  modalActionButton: {
    flex: 1,
  },
});