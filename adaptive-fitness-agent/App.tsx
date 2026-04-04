import React from "react";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";

import AuthGate from "./app/AuthGate";
import { AppAlertProvider } from "./components/ui/AppAlert";
import { appTheme } from "./theme/designSystem";

const navigationTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: appTheme.colors.background,
    card: appTheme.colors.background,
    text: appTheme.colors.text,
    border: appTheme.colors.background,
    primary: appTheme.colors.primary,
  },
};

export default function App() {
  return (
    <AppAlertProvider>
      <NavigationContainer theme={navigationTheme}>
        <AuthGate />
      </NavigationContainer>
    </AppAlertProvider>
  );
}
