import React from "react";
import { View, StyleSheet, Text } from "react-native";

import { MyNotesQuery } from "../graphql/generated";

type MyNotesItemProps = {
  note: MyNotesQuery["notes"][number];
};

const MyNotesItem = ({ note }: MyNotesItemProps) => {
  return (
    <View style={styles.container}>
      <Text>{note.content}</Text>
      <Text>{note.createdAt}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "gray",
  },
});

export default MyNotesItem;
