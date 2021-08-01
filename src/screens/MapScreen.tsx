import React, { useState, useCallback } from "react";
import { StyleSheet, View } from "react-native";

import CustomMap from "../components/CustomMap";
import { useMarkers } from "../hooks/useMarkers";
import Location from "../models/location";
import { LocationConstants } from "../utils/constants";

const MapScreen = () => {
  const [location, setLocation] = useState<Location | null>(null);
  const { markers } = useMarkers(location);

  const handleUserLocationChange = useCallback(
    (newLocation: Location) => {
      if (!location) {
        setLocation(newLocation);
        return;
      }

      const distance = newLocation.distance(location);

      if (distance >= LocationConstants.minimumRefetchDistance) {
        setLocation(newLocation);
      }
    },
    [location]
  );

  return (
    <View style={styles.container}>
      <CustomMap
        markers={markers}
        onUserLocationChange={handleUserLocationChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default MapScreen;
