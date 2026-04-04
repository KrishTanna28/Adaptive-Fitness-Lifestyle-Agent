import React from "react";
import { ActivityIndicator, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "./HomeScreen";
import LoginScreen from "./LoginScreen";
import PasswordSetupScreen from "./PasswordSetupScreen";
import { useAuthUser } from "../hooks/useAuthUser";
import { needsPasswordSetup } from "../utils/authRouting";
import { appTheme } from "../theme/designSystem";
import { styles } from "../App.styles";

export type RootStackParamList = {
  Login: undefined;
  PasswordSetup: undefined;
  Home: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AuthGate() {
  const { user, loading } = useAuthUser();

  if (loading) {
    return (
      <View style={styles.loaderScreen}>
        <ActivityIndicator size="large" color={appTheme.colors.text} />
      </View>
    );
  }

  const routeState = !user
    ? "guest"
    : needsPasswordSetup(user)
      ? "password-setup"
      : "authenticated";

    return (
    <Stack.Navigator
      key={routeState}
      initialRouteName={!user ? "Login" : needsPasswordSetup(user) ? "PasswordSetup" : "Home"}
      screenOptions={{ headerShown: false }}
    >
      {!user ? (
        <Stack.Screen name="Login" component={LoginScreen} />
      ) : (
        <>
          <Stack.Screen name="PasswordSetup">
            {() => <PasswordSetupScreen user={user} />}
          </Stack.Screen>
          <Stack.Screen name="Home">
            {() => <HomeScreen user={user} />}
          </Stack.Screen>
        </>
      )}
    </Stack.Navigator>
  );
}
