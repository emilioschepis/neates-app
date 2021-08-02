import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { NotesQuery } from "../graphql/generated";

type CustomCalloutProps = {
  note: NotesQuery["notes"][number];
};

const CustomCallout = ({ note }: CustomCalloutProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.content} numberOfLines={1}>
        {note.content}
      </Text>
      <Text style={styles.view}>View</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 250,
    flexDirection: "row",
    alignItems: "center",
  },
  content: {
    flex: 1,
    marginRight: 4,
  },
  view: {
    textTransform: "uppercase",
    color: "#007AFF",
    fontWeight: "bold",
  },
});

export default CustomCallout;
