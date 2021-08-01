import React from "react";
import { View, StyleSheet } from "react-native";

const CustomMarker = () => {
  return <View style={styles.container} />;
};

const styles = StyleSheet.create({
  container: {
    width: 20,
    height: 20,
    backgroundColor: "yellow",
    transform: [{ rotate: "10deg" }],
    borderWidth: 1,
    borderColor: "rgb(192,192,0)",
  },
});

export default CustomMarker;
