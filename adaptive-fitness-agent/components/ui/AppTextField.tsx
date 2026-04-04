import React, { useState } from "react";
import {
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from "react-native";
import { Eye, EyeOff } from "lucide-react-native";
import { appTheme } from "../../theme/designSystem";
import { styles } from "./AppTextField.styles";

type AppTextFieldProps = TextInputProps & {
  label: string;
  isPasswordField?: boolean;
};

export default function AppTextField({
  label,
  style,
  isPasswordField = false,
  secureTextEntry,
  ...props
}: AppTextFieldProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const shouldHideText = isPasswordField
    ? !isPasswordVisible
    : Boolean(secureTextEntry);

  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>{label}</Text>

      <View style={styles.inputRow}>
        <TextInput
          style={[styles.input, isPasswordField && styles.inputWithButton, style]}
          secureTextEntry={shouldHideText}
          {...props}
        />

        {isPasswordField ? (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setIsPasswordVisible((prev) => !prev)}
            style={styles.visibilityButton}
          >
            {isPasswordVisible ? (
              <EyeOff
                size={20}
                color={appTheme.colors.mutedText}
                strokeWidth={2}
              />
            ) : (
              <Eye
                size={20}
                color={appTheme.colors.mutedText}
                strokeWidth={2}
              />
            )}
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
}
