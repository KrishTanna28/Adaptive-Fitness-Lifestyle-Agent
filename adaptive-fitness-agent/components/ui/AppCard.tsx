import React, { ReactNode } from "react";
import { View, ViewStyle } from "react-native";
import { styles } from "./AppCard.styles";

type AppCardProps = {
  children: ReactNode;
  variant?: "default" | "tinted";
  style?: ViewStyle;
};

export default function AppCard({
  children,
  variant = "default",
  style,
}: AppCardProps) {
  return (
    <View
      style={[
        styles.base,
        variant === "default" ? styles.defaultCard : styles.tintedCard,
        style,
      ]}
    >
      {children}
    </View>
  );
}
