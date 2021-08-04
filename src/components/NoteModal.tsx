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
    <View style={styles.container}>
      <Modal isVisible={!!noteId && data?.note?.id === noteId} onBackdropPress={onClose}>
        <NoteView note={data?.note} />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
  },
});

export default NoteModal;
