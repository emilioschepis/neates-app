import { useTheme } from "@react-navigation/native";
import React from "react";
import { View, StyleSheet, Pressable, Text, ActivityIndicator } from "react-native";

type ButtonProps = {
  color?: string;
  children: React.ReactNode;
  disabled?: boolean;
  loading?: boolean;
  onPress: () => void;
};

const Button = ({ color, children, disabled = false, loading = false, onPress }: ButtonProps) => {
  const theme = useTheme();

  return (
    <Pressable
      disabled={disabled || loading}
      style={({ pressed }) => ({ opacity: pressed ? 0.6 : 1.0, width: "100%" })}
      onPress={onPress}
    >
      <View style={[styles.container, { backgroundColor: disabled ? "gray" : color ?? theme.colors.primary }]}>
        {loading ? (
          <View style={styles.loading}>
            <ActivityIndicator size="small" color="white" />
          </View>
        ) : null}
        <Text numberOfLines={1} style={styles.text}>
          {children}
        </Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: 44,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    paddingHorizontal: 16,
  },
  loading: {
    marginRight: 8,
  },
  text: {
    color: "white",
    fontWeight: "bold",
    fontSize: 14,
    textTransform: "uppercase",
  },
});

export default Button;
