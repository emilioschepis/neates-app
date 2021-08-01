import React, { useState, useCallback } from "react";
import { View, StyleSheet } from "react-native";

import CustomMap from "../components/CustomMap";
import Location from "../models/location";
import { LocationConstants } from "../utils/constants";

const MapScreen = () => {
  const [location, setLocation] = useState<Location | null>(null);

  const handleUserLocationChange = useCallback(
    (newLocation: Location) => {
      if (location === null) {
        setLocation(newLocation);
        return;
      }

      const distance = newLocation.distance(location);

      if (distance >= LocationConstants.minimumRefetchDistance) {
        console.log(distance);
        setLocation(newLocation);
      }
    },
    [location]
  );

  return (
    <View style={styles.container}>
      <CustomMap onUserLocationChange={handleUserLocationChange} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default MapScreen;
