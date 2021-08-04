import React, { useCallback, useState } from "react";
import { StyleSheet, View } from "react-native";

import CustomMap from "../components/CustomMap";
import NoteModal from "../components/NoteModal";
import useNotes from "../hooks/useNotes";
import Location from "../models/location";
import { LocationConstants } from "../utils/constants";

const MapScreen = () => {
  const [location, setLocation] = useState<Location | null>(null);
  const [selectedNote, setSelectedNote] = useState<string | null>(null);
  const { notes } = useNotes(location);

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

  const handleSelectNote = useCallback((noteId: string) => setSelectedNote(noteId), []);

  const clearSelectedNote = useCallback(() => setSelectedNote(null), []);

  return (
    <View style={styles.container}>
      <CustomMap notes={notes} onSelectNote={handleSelectNote} onUserLocationChange={handleUserLocationChange} />
      <NoteModal noteId={selectedNote} onClose={clearSelectedNote} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default MapScreen;
