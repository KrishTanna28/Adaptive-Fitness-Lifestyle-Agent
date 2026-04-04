import { StyleSheet } from "react-native";
import { appTheme } from "./designSystem";

export const globalStyles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: appTheme.colors.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: appTheme.spacing.lg,
    paddingVertical: appTheme.spacing.xl,
  },
  centered: {
    justifyContent: "center",
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
  },
  rowWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  pill: {
    borderRadius: appTheme.radii.pill,
    paddingHorizontal: appTheme.spacing.md,
    paddingVertical: appTheme.spacing.xs,
  },
});
