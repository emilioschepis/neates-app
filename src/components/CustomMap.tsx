import * as Location from "expo-location";
import React, { useRef } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import MapView, { Callout, Marker as MarkerView } from "react-native-maps";

import { useLocation } from "../context/LocationContext";
import { NotesQuery } from "../graphql/generated";
import CustomCallout from "./CustomCallout";
import CustomMapButton, { CustomMapButtonProps } from "./CustomMapButton";
import CustomMarker from "./CustomMarker";

/**
 * A custom map style that hides points of interest from the custom map.
 */
const CUSTOM_MAP_STYLE = [
  {
    featureType: "poi",
    stylers: [{ visibility: "off" }],
  },
  {
    featureType: "transit",
    stylers: [{ visibility: "off" }],
  },
];

type CustomMapProps = {
  notes: NotesQuery["notes"];
  buttons: CustomMapButtonProps[];
  onSelectNote: (noteId: string) => void;
};

const CustomMap = ({ notes, buttons, onSelectNote }: CustomMapProps) => {
  const mapRef = useRef<MapView | null>(null);
  const { location } = useLocation();

  async function resetMapRegion() {
    const latestLocation = await Location.getLastKnownPositionAsync();

    mapRef.current?.animateToRegion({
      latitude: latestLocation?.coords.latitude ?? location.latitude,
      longitude: latestLocation?.coords.longitude ?? location.longitude,
      latitudeDelta: 0.002,
      longitudeDelta: 0.002,
    });
  }

  return (
    <View style={styles.container}>
      <MapView
        ref={(map) => (mapRef.current = map)}
        style={styles.map}
        showsUserLocation
        showsPointsOfInterest={false}
        customMapStyle={CUSTOM_MAP_STYLE}
        onMapReady={resetMapRegion}
      >
        {notes.map((note) => (
          <MarkerView
            key={note.id}
            coordinate={{
              latitude: note.latitude,
              longitude: note.longitude,
            }}
            onCalloutPress={() => onSelectNote(note.id)}
          >
            <CustomMarker />
            <Callout>
              <CustomCallout note={note} />
            </Callout>
          </MarkerView>
        ))}
      </MapView>
      <View style={styles.buttonsContainer}>
        <CustomMapButton size="small" icon="locate" onClick={resetMapRegion} />
        {buttons.map((buttonProps, idx) => (
          <CustomMapButton key={idx.toString()} {...buttonProps} style={{ marginTop: 8 }} />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: Dimensions.get("screen").width,
    height: Dimensions.get("screen").height,
  },
  buttonsContainer: {
    position: "absolute",
    bottom: 16,
    right: 16,
    alignItems: "center",
  },
});

export default CustomMap;
