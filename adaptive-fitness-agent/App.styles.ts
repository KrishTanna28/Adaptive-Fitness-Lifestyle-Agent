import { StyleSheet } from "react-native";
import { appTheme } from "./theme/designSystem";

export const styles = StyleSheet.create({
  loaderScreen: {
    flex: 1,
    backgroundColor: appTheme.colors.background,
    justifyContent: "center",
    alignItems: "center",
  },
});
