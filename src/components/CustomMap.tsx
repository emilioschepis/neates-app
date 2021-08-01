import React, { useCallback } from "react";
import { Dimensions, View, StyleSheet } from "react-native";
import MapView, { EventUserLocation } from "react-native-maps";

import Location from "../models/location";

type CustomMapProps = {
  onUserLocationChange: (location: Location) => void;
};

const CustomMap = ({ onUserLocationChange }: CustomMapProps) => {
  const handleUserLocationChange = useCallback(
    (event: EventUserLocation) => {
      if (
        !event.nativeEvent?.coordinate?.latitude ||
        !event.nativeEvent?.coordinate?.longitude
      ) {
        return;
      }

      const location = new Location(
        event.nativeEvent.coordinate.latitude,
        event.nativeEvent.coordinate.longitude
      );

      onUserLocationChange(location);
    },
    [onUserLocationChange]
  );

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        showsUserLocation
        followsUserLocation
        scrollEnabled={false}
        zoomEnabled={false}
        pitchEnabled={false}
        onUserLocationChange={handleUserLocationChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  map: {
    width: Dimensions.get("screen").width,
    height: Dimensions.get("screen").height,
  },
});

export default CustomMap;
