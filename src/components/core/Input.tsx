import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import React, { useState } from "react";
import {
  KeyboardTypeOptions,
  StyleProp,
  StyleSheet,
  Text,
  TextInputProps,
  View,
  ViewStyle,
  TextInput,
} from "react-native";

type InputProps = {
  autoCapitalize?: TextInputProps["autoCapitalize"];
  disabled?: boolean;
  error?: string;
  keyboardType?: KeyboardTypeOptions;
  label: string;
  maxLength?: number;
  multiline?: boolean;
  placeholder?: string;
  secureTextEntry?: boolean;
  textContentType?: TextInputProps["textContentType"];
  text: string;
  style?: StyleProp<ViewStyle>;
  onBlur?: () => void;
  onChangeText?: (value: string) => void;
};

const Input = ({
  autoCapitalize,
  disabled = false,
  error,
  keyboardType,
  label,
  maxLength,
  multiline = false,
  placeholder,
  secureTextEntry,
  textContentType,
  text,
  style,
  onBlur,
  onChangeText,
}: InputProps) => {
  const theme = useTheme();
  const [focus, setFocus] = useState(false);

  return (
    <View style={[style, styles.container]}>
      <Text style={styles.labelText}>{label}</Text>
      <TextInput
        style={[
          styles.input,
          {
            borderColor: focus ? theme.colors.primary : error ? "red" : "lightgray",
            backgroundColor: disabled ? "lightgray" : "white",
            paddingTop: multiline ? 16 : undefined,
            flex: multiline ? 1 : undefined,
          },
        ]}
        autoCapitalize={autoCapitalize}
        editable={!disabled}
        keyboardType={keyboardType}
        maxLength={maxLength}
        multiline={multiline}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        textContentType={textContentType}
        value={text}
        onChangeText={onChangeText}
        onFocus={() => {
          setFocus(true);
        }}
        onBlur={() => {
          setFocus(false);
          onBlur?.();
        }}
      />
      {maxLength ? (
        <Text style={styles.lengthText}>
          {text.length}/{maxLength}
        </Text>
      ) : null}
      {error ? (
        <View style={styles.errorContainer}>
          <Ionicons name="alert-circle" color="red" size={16} />
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  labelText: {
    fontSize: 12,
    textTransform: "uppercase",
    marginBottom: 4,
    fontWeight: "bold",
  },
  input: {
    minHeight: 44,
    borderWidth: 2,
    borderRadius: 8,
    padding: 16,
  },
  errorContainer: {
    flexDirection: "row",
    marginTop: 4,
    alignItems: "center",
  },
  errorText: {
    marginLeft: 4,
    color: "red",
    flexShrink: 1,
  },
  lengthText: {
    marginTop: 4,
    width: "100%",
    textAlign: "right",
    fontSize: 12,
    fontWeight: "bold",
  },
});

export default Input;
