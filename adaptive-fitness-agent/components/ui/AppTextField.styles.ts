import { StyleSheet } from "react-native";
import { appTheme } from "../../theme/designSystem";

export const styles = StyleSheet.create({
  wrapper: {
    gap: appTheme.spacing.xs,
  },
  label: {
    ...appTheme.typography.label,
  },
  inputRow: {
    position: "relative",
    justifyContent: "center",
  },
  input: {
    minHeight: 54,
    borderRadius: appTheme.radii.md,
    backgroundColor: appTheme.colors.inputBackground,
    borderWidth: 1,
    borderColor: appTheme.colors.border,
    paddingHorizontal: appTheme.spacing.md,
    color: appTheme.colors.text,
    fontSize: 15,
    fontWeight: "500",
  },
  inputWithButton: {
    paddingRight: 56,
  },
  visibilityButton: {
    position: "absolute",
    right: appTheme.spacing.md,
    width: 24,
    height: 24,
    alignItems: "center",
    justifyContent: "center",
  },
});
