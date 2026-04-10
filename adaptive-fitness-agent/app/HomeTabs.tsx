import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import type { User } from "firebase/auth/react-native";
import { Activity, Apple, Flame, House, Lightbulb, User as UserIcon } from "lucide-react-native";

import ActivityTrackingScreen from "./ActivityTrackingScreen";
import AICoachScreen from "./AICoachScreen";
import HomeScreen from "./HomeScreen";
import NutritionScreen from "./NutritionScreen";
import ProfileScreen from "./ProfileScreen";
import WorkoutScreen from "./WorkoutScreen";
import useLiveStepCounter from "../hooks/useLiveStepCounter";
import { appTheme } from "../theme/designSystem";

type HomeTabParamList = {
  Home: undefined;
  Activity: undefined;
  Workout: undefined;
  Diet: undefined;
  Coach: undefined;
  Profile: undefined;
};

type HomeTabsProps = {
  user: User;
};

const Tab = createBottomTabNavigator<HomeTabParamList>();

export default function HomeTabs({ user }: HomeTabsProps) {
  const liveStepCounter = useLiveStepCounter();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: appTheme.colors.text,
        tabBarInactiveTintColor: appTheme.colors.mutedText,
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "600",
        },
        tabBarStyle: {
          backgroundColor: appTheme.colors.cardAlt,
          borderTopColor: appTheme.colors.border,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        options={{
          tabBarIcon: ({ color, size }) => (
            <House size={size} color={color} strokeWidth={2.2} />
          ),
        }}
      >
        {() => <HomeScreen user={user} liveStepCounter={liveStepCounter} />}
      </Tab.Screen>

      <Tab.Screen
        name="Activity"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Activity size={size} color={color} strokeWidth={2.2} />
          ),
        }}
      >
        {() => <ActivityTrackingScreen liveStepCounter={liveStepCounter} />}
      </Tab.Screen>

      <Tab.Screen
        name="Workout"
        component={WorkoutScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Flame size={size} color={color} strokeWidth={2.2} />
          ),
        }}
      />

      <Tab.Screen
        name="Diet"
        component={NutritionScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Apple size={size} color={color} strokeWidth={2.2} />
          ),
        }}
      />

      <Tab.Screen
        name="Coach"
        component={AICoachScreen}
        options={{
          title: "AI Coach",
          tabBarIcon: ({ color, size }) => (
            <Lightbulb size={size} color={color} strokeWidth={2.2} />
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        options={{
          tabBarIcon: ({ color, size }) => (
            <UserIcon size={size} color={color} strokeWidth={2.2} />
          ),
        }}
      >
        {() => <ProfileScreen user={user} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}