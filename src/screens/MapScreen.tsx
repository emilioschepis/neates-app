import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useCallback, useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";

import CustomMap from "../components/CustomMap";
import NoteModal from "../components/NoteModal";
import useNotes from "../hooks/useNotes";
import Location from "../models/location";
import { MapStackParamList } from "../navigation/MapStack";

type MapScreenNavigationProp = StackNavigationProp<MapStackParamList, "Map">;

const MapScreen = () => {
  const navigation = useNavigation<MapScreenNavigationProp>();
  const [location, setLocation] = useState<Location | null>(null);
  const [selectedNote, setSelectedNote] = useState<string | null>(null);
  const { notes } = useNotes(location);

  const handleSelectNote = useCallback((noteId: string) => setSelectedNote(noteId), []);
  const clearSelectedNote = useCallback(() => setSelectedNote(null), []);

  return (
    <View style={styles.container}>
      <CustomMap notes={notes} onSelectNote={handleSelectNote} onUserLocationChange={setLocation} />
      <NoteModal noteId={selectedNote} onClose={clearSelectedNote} />
      <View style={styles.fabContainer}>
        <Pressable onPress={() => location && navigation.navigate("CreateNote", { location })}>
          <View style={styles.fab} />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapContainer: {},
  fabContainer: {
    position: "absolute",
    zIndex: 1,
    bottom: 16,
    right: 16,
  },
  fab: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#007AFF",
  },
});

export default MapScreen;
