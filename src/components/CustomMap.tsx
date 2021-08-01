import React, { useCallback } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import MapView, { Marker as MarkerView, Region } from "react-native-maps";

import Location from "../models/location";
import Marker from "../models/marker";

type CustomMapProps = {
  markers: Marker[];
  onUserLocationChange: (location: Location) => void;
};

const CustomMap = ({ markers, onUserLocationChange }: CustomMapProps) => {
  const handleRegionChangeComplete = useCallback(
    (region: Region) => {
      const location = new Location(region.latitude, region.longitude);
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
        onRegionChangeComplete={handleRegionChangeComplete}
      >
        {markers.map((marker) => (
          <MarkerView
            key={marker.id}
            title={marker.title}
            coordinate={{
              latitude: marker.latitude,
              longitude: marker.longitude,
            }}
          />
        ))}
      </MapView>
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
