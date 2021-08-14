import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useCallback, useMemo, useState } from "react";
import { StyleSheet, View } from "react-native";

import CustomMap from "../components/CustomMap";
import { CustomMapButtonProps } from "../components/CustomMapButton";
import NoteModal from "../components/NoteModal";
import { useAuth } from "../context/AuthContext";
import useNotes from "../hooks/useNotes";
import { MapStackParamList } from "../navigation/MapStack";

type MapScreenNavigationProp = StackNavigationProp<MapStackParamList, "Map">;

const MapScreen = () => {
  const { isAnonymous } = useAuth();
  const navigation = useNavigation<MapScreenNavigationProp>();
  const [selectedNote, setSelectedNote] = useState<string | null>(null);
  const { notes } = useNotes();

  const handleSelectNote = useCallback((noteId: string) => setSelectedNote(noteId), []);
  const clearSelectedNote = useCallback(() => setSelectedNote(null), []);

  const mapButtons = useMemo(() => {
    const buttons: CustomMapButtonProps[] = [];

    if (!isAnonymous) {
      buttons.push({ icon: "pencil", onClick: () => navigation.navigate("CreateNote") });
    }

    return buttons;
  }, [isAnonymous]);

  return (
    <>
      <View style={styles.container}>
        <CustomMap notes={notes} onSelectNote={handleSelectNote} buttons={mapButtons} />
        <NoteModal noteId={selectedNote} onClose={clearSelectedNote} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default MapScreen;
