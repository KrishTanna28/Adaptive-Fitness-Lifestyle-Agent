import { Platform, TextStyle, ViewStyle } from "react-native";

export const colors = {
  background: "#F6F6F6",
  card: "#E0DBF3",
  cardAlt: "#FFFFFF",
  primary: "#F3BA60",
  secondary: "#B6B1C0",
  text: "#202022",
  mutedText: "#736A6A",
  border: "#D9D4E8",
  inputBackground: "#FFFFFF",
  strength: "#F8D2A6",
  yoga: "#D9D0F0",
};

export const radii = {
  sm: 16,
  md: 20,
  lg: 24,
  pill: 999,
};

export const spacing = {
  xs: 8,
  sm: 12,
  md: 16,
  lg: 20,
  xl: 24,
  xxl: 32,
};

export const typography = {
  heading: {
    fontSize: 24,
    lineHeight: 30,
    fontWeight: "700" as TextStyle["fontWeight"],
    color: colors.text,
  },
  subheading: {
    fontSize: 18,
    lineHeight: 24,
    fontWeight: "700" as TextStyle["fontWeight"],
    color: colors.text,
  },
  body: {
    fontSize: 15,
    lineHeight: 22,
    fontWeight: "500" as TextStyle["fontWeight"],
    color: colors.text,
  },
  label: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "500" as TextStyle["fontWeight"],
    color: colors.mutedText,
  },
  caption: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: "500" as TextStyle["fontWeight"],
    color: colors.mutedText,
  },
};

export const shadows = {
  soft: Platform.select<ViewStyle>({
    ios: {
      shadowColor: colors.text,
      shadowOpacity: 0.08,
      shadowRadius: 12,
      shadowOffset: { width: 0, height: 6 },
    },
    android: {
      elevation: 3,
    },
    default: {},
  }) as ViewStyle,
  medium: Platform.select<ViewStyle>({
    ios: {
      shadowColor: colors.text,
      shadowOpacity: 0.12,
      shadowRadius: 16,
      shadowOffset: { width: 0, height: 8 },
    },
    android: {
      elevation: 5,
    },
    default: {},
  }) as ViewStyle,
};

export const appTheme = {
  colors,
  radii,
  spacing,
  typography,
  shadows,
};
