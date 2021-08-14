import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import React from "react";
import { View, StyleSheet, StyleProp, ViewStyle, Pressable } from "react-native";

export type CustomMapButtonProps = {
  icon?: string;
  size?: "small" | "default";
  style?: StyleProp<ViewStyle>;
  onClick: () => Promise<void> | void;
};

const CustomMapButton = ({ icon = "help", size = "default", style, onClick }: CustomMapButtonProps) => {
  const theme = useTheme();

  const buttonSize = (() => {
    switch (size) {
      case "small":
        return 44;
      default:
        return 56;
    }
  })();

  const iconSize = (() => {
    switch (size) {
      case "small":
        return 24;
      default:
        return 28;
    }
  })();

  const buttonStyle: StyleProp<ViewStyle> = {
    width: buttonSize,
    height: buttonSize,
    backgroundColor: theme.colors.primary,
  };

  return (
    <Pressable onPress={onClick} style={({ pressed }) => ({ opacity: pressed ? 0.6 : 1 })}>
      <View style={[style, buttonStyle, styles.container]}>
        <Ionicons name={icon as any} size={iconSize} color="white" />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 999,
    paddingLeft: 1, // Icons seem to have a left offset
  },
});

export default CustomMapButton;
