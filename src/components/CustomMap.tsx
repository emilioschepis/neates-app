import React, { useCallback, useRef } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import MapView, { Callout, Marker as MarkerView } from "react-native-maps";

import { useLocation } from "../context/LocationContext";
import { NotesQuery } from "../graphql/generated";
import CustomCallout from "./CustomCallout";
import CustomMarker from "./CustomMarker";

type CustomMapProps = {
  notes: NotesQuery["notes"];
  onSelectNote: (noteId: string) => void;
};

const CustomMap = ({ notes, onSelectNote }: CustomMapProps) => {
  const mapRef = useRef<MapView | null>(null);
  const { location } = useLocation();

  const handleMapReady = useCallback(() => {
    mapRef.current?.animateToRegion({
      latitude: location.latitude,
      longitude: location.longitude,
      latitudeDelta: 0.002,
      longitudeDelta: 0.002,
    });
  }, [location]);

  return (
    <View style={styles.container}>
      <MapView ref={(map) => (mapRef.current = map)} style={styles.map} showsUserLocation onMapReady={handleMapReady}>
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
