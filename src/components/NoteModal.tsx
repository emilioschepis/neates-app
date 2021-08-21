import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import Modal from "react-native-modal";

import { useNoteQuery } from "../graphql/generated";
import NoteView from "./NoteView";

type NoteModalProps = {
  noteId: string | null;
  onClose: () => void;
};

const NoteModal = ({ noteId, onClose }: NoteModalProps) => {
  const { data, loading } = useNoteQuery({
    variables: { id: noteId },
    skip: !noteId,
  });

  return (
    <Modal isVisible={!!noteId} onBackdropPress={onClose}>
      <View style={styles.container}>{loading || !data ? <ActivityIndicator /> : <NoteView note={data.note} />}</View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default NoteModal;
