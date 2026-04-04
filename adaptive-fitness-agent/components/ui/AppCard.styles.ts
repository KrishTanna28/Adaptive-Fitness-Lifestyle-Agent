import { StyleSheet } from "react-native";
import { appTheme } from "../../theme/designSystem";

export const styles = StyleSheet.create({
  base: {
    borderRadius: appTheme.radii.md,
    padding: appTheme.spacing.lg,
    ...appTheme.shadows.soft,
  },
  defaultCard: {
    backgroundColor: appTheme.colors.cardAlt,
  },
  tintedCard: {
    backgroundColor: appTheme.colors.card,
  },
});
