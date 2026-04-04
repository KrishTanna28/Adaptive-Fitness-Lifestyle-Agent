import React from "react";
import { Text, TextInput, TextInputProps, View } from "react-native";
import { styles } from "./AppTextField.styles";

type AppTextFieldProps = TextInputProps & {
  label: string;
};

export default function AppTextField({
  label,
  style,
  ...props
}: AppTextFieldProps) {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>{label}</Text>
      <TextInput style={[styles.input, style]} {...props} />
    </View>
  );
}
