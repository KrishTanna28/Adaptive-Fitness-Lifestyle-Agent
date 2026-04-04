import { StyleSheet } from "react-native";
import { appTheme } from "../../theme/designSystem";

export const styles = StyleSheet.create({
  base: {
    minHeight: 54,
    borderRadius: appTheme.radii.lg,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: appTheme.spacing.lg,
  },
  primary: {
    backgroundColor: appTheme.colors.primary,
    ...appTheme.shadows.medium,
  },
  secondary: {
    backgroundColor: appTheme.colors.card,
    ...appTheme.shadows.soft,
  },
  disabled: {
    opacity: 0.6,
  },
  text: {
    fontSize: 15,
    fontWeight: "700",
  },
  primaryText: {
    color: appTheme.colors.text,
  },
  secondaryText: {
    color: appTheme.colors.text,
  },
});
