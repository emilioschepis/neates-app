import React from "react";
import { StyleSheet, View } from "react-native";
import Modal from "react-native-modal";

import { useNoteQuery } from "../graphql/generated";
import NoteView from "./NoteView";

type NoteModalProps = {
  noteId: string | null;
  onClose: () => void;
};

const NoteModal = ({ noteId, onClose }: NoteModalProps) => {
  const { data } = useNoteQuery({
    variables: { id: noteId },
    skip: !noteId,
  });

  return (
    <Modal isVisible={!!noteId && data?.note?.data.id === noteId} onBackdropPress={onClose}>
      <View style={styles.container}>{data && <NoteView note={data.note.data} />}</View>
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
