import { useTheme } from "@react-navigation/native";
import React from "react";
import { View, StyleSheet, StyleProp, ViewStyle, Pressable } from "react-native";

export type CustomMapButtonProps = {
  size?: "small" | "default";
  style?: StyleProp<ViewStyle>;
  onClick: () => Promise<void> | void;
};

const CustomMapButton = ({ size = "default", style, onClick }: CustomMapButtonProps) => {
  const theme = useTheme();

  const buttonStyle: StyleProp<ViewStyle> = {
    width: size === "default" ? 56 : 44,
    height: size === "default" ? 56 : 44,
    backgroundColor: theme.colors.primary,
  };

  return (
    <Pressable onPress={onClick}>
      <View style={[style, buttonStyle, styles.container]} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 999,
  },
});

export default CustomMapButton;
