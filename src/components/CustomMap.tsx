import React, { useCallback } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import MapView, {
  Callout,
  Marker as MarkerView,
  Region,
} from "react-native-maps";

import { NotesQuery } from "../graphql/generated";
import Location from "../models/location";
import CustomCallout from "./CustomCallout";
import CustomMarker from "./CustomMarker";

type CustomMapProps = {
  notes: NotesQuery["notes"];
  onUserLocationChange: (location: Location) => void;
};

const CustomMap = ({ notes, onUserLocationChange }: CustomMapProps) => {
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
        {notes.map((note) => (
          <MarkerView
            key={note.id}
            coordinate={{
              latitude: note.location.coordinates[1],
              longitude: note.location.coordinates[0],
            }}
          >
            <CustomMarker />
            <Callout>
              <CustomCallout note={note} />
            </Callout>
          </MarkerView>
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
