import React, { useRef } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import MapView, { Callout, Marker as MarkerView } from "react-native-maps";

import { useLocation } from "../context/LocationContext";
import { NotesQuery } from "../graphql/generated";
import CustomCallout from "./CustomCallout";
import CustomMapButton, { CustomMapButtonProps } from "./CustomMapButton";
import CustomMarker from "./CustomMarker";

type CustomMapProps = {
  notes: NotesQuery["notes"];
  buttons: CustomMapButtonProps[];
  onSelectNote: (noteId: string) => void;
};

const CustomMap = ({ notes, buttons, onSelectNote }: CustomMapProps) => {
  const mapRef = useRef<MapView | null>(null);
  const { location } = useLocation();

  function resetMapRegion() {
    mapRef.current?.animateToRegion({
      latitude: location.latitude,
      longitude: location.longitude,
      latitudeDelta: 0.002,
      longitudeDelta: 0.002,
    });
  }

  return (
    <View style={styles.container}>
      <MapView ref={(map) => (mapRef.current = map)} style={styles.map} showsUserLocation onMapReady={resetMapRegion}>
        {notes.map((note) => (
          <MarkerView
            key={note.id}
            coordinate={{
              latitude: note.location.coordinates[1],
              longitude: note.location.coordinates[0],
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
