import React, { useEffect, useRef } from "react";
import { Animated, type StyleProp, type ViewStyle } from "react-native";

import { appTheme } from "../../theme/designSystem";

type SkeletonVariant = "default" | "home" | "activity" | "auth";

type AppSkeletonProps = {
  width: number | `${number}%`;
  height: number;
  borderRadius?: number;
  variant?: SkeletonVariant;
  style?: StyleProp<ViewStyle>;
};

const variantPalette: Record<SkeletonVariant, { color: string; minOpacity: number; maxOpacity: number; duration: number }> = {
  default: {
    color: appTheme.colors.border,
    minOpacity: 0.45,
    maxOpacity: 0.9,
    duration: 700,
  },
  home: {
    color: "#D6CEE8",
    minOpacity: 0.38,
    maxOpacity: 0.86,
    duration: 760,
  },
  activity: {
    color: "#D0D8E6",
    minOpacity: 0.36,
    maxOpacity: 0.84,
    duration: 680,
  },
  auth: {
    color: "#DCCBEA",
    minOpacity: 0.4,
    maxOpacity: 0.88,
    duration: 820,
  },
};

export default function AppSkeleton({
  width,
  height,
  borderRadius = appTheme.radii.sm,
  variant = "default",
  style,
}: AppSkeletonProps) {
  const shimmerOpacity = useRef(new Animated.Value(variantPalette[variant].minOpacity)).current;
  const palette = variantPalette[variant];

  useEffect(() => {
    shimmerOpacity.setValue(palette.minOpacity);

    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(shimmerOpacity, {
          toValue: palette.maxOpacity,
          duration: palette.duration,
          useNativeDriver: true,
        }),
        Animated.timing(shimmerOpacity, {
          toValue: palette.minOpacity,
          duration: palette.duration,
          useNativeDriver: true,
        }),
      ]),
    );

    animation.start();

    return () => {
      animation.stop();
    };
  }, [shimmerOpacity, palette.maxOpacity, palette.minOpacity, palette.duration]);

  return (
    <Animated.View
      style={[
        {
          width,
          height,
          borderRadius,
          backgroundColor: palette.color,
          opacity: shimmerOpacity,
        },
        style,
      ]}
    />
  );
}