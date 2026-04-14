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
    gap: appTheme.spacing.sm,
    alignItems: "center",
    position: "relative",
    zIndex: 30,
    elevation: 30,
    overflow: "visible",
  },
  photoPressable: {
    width: 132,
    height: 132,
    borderRadius: 66,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: appTheme.colors.border,
    backgroundColor: appTheme.colors.inputBackground,
  },
  avatarImage: {
    width: "100%",
    height: "100%",
  },
  avatarFallback: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    gap: appTheme.spacing.xs,
    backgroundColor: appTheme.colors.card,
  },
  avatarFallbackText: {
    ...appTheme.typography.caption,
    color: appTheme.colors.mutedText,
  },
  title: {
    ...appTheme.typography.heading,
    color: appTheme.colors.text,
  },
  subtitle: {
    ...appTheme.typography.body,
    color: appTheme.colors.mutedText,
    textAlign: "center",
  },
  completionCard: {
    gap: appTheme.spacing.sm,
    position: "relative",
    zIndex: 1,
    elevation: 1,
  },
  completionTitle: {
    ...appTheme.typography.subheading,
    color: appTheme.colors.text,
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
  },
  detailsCard: {
    gap: appTheme.spacing.md,
  },
  detailsHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: appTheme.spacing.xs,
  },
  editButton: {
    width: 36,
    height: 36,
    borderRadius: appTheme.radii.pill,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: appTheme.colors.card,
    borderWidth: 1,
    borderColor: appTheme.colors.border,
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
  sectionTitle: {
    ...appTheme.typography.subheading,
    color: appTheme.colors.text,
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
  previewRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: appTheme.spacing.sm,
  },
  previewLabel: {
    ...appTheme.typography.label,
    color: appTheme.colors.mutedText,
    flex: 1,
  },
  previewValue: {
    ...appTheme.typography.body,
    color: appTheme.colors.text,
    flex: 1,
    textAlign: "right",
  },
  bottomSpace: {
    paddingBottom: appTheme.spacing.xl,
  },
  bottomHint: {
    ...appTheme.typography.caption,
    color: appTheme.colors.mutedText,
    textAlign: "center",
  },
  photoMenuContainer: {
    position: "relative",
    alignItems: "center",
    zIndex: 60,
    elevation: 60,
  },
  photoDropdown: {
    position: "absolute",
    top: 140,
    width: 180,
    borderRadius: appTheme.radii.md,
    borderWidth: 1,
    borderColor: appTheme.colors.border,
    backgroundColor: appTheme.colors.cardAlt,
    overflow: "hidden",
    zIndex: 70,
    elevation: 70,
    ...appTheme.shadows.soft,
  },
  photoDropdownAction: {
    paddingVertical: appTheme.spacing.sm,
    paddingHorizontal: appTheme.spacing.md,
    backgroundColor: appTheme.colors.cardAlt,
  },
  photoDropdownActionWithDivider: {
    borderBottomWidth: 1,
    borderBottomColor: appTheme.colors.border,
  },
  photoDropdownActionText: {
    ...appTheme.typography.body,
    color: appTheme.colors.text,
    fontWeight: "600",
    textAlign: "center",
  },
});