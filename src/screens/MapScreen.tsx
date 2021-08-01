import React from "react";
import { View, StyleSheet } from "react-native";

import CustomMap from "../components/CustomMap";

const MapScreen = () => {
  return (
    <View style={styles.container}>
      <CustomMap onUserLocationChange={console.log} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default MapScreen;
