import React from "react";
import { FlatList, StyleSheet } from "react-native";

import { MyNotesQuery } from "../graphql/generated";
import MyNotesItem from "./MyNotesItem";

type MyNotesListProps = {
  notes: MyNotesQuery["notes"];
};

const MyNotesList = ({ notes }: MyNotesListProps) => {
  return (
    <FlatList
      data={notes}
      keyExtractor={(note) => note.id}
      renderItem={({ item: note }) => <MyNotesItem note={note} />}
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
});

export default MyNotesList;
