import { Ionicons } from "@expo/vector-icons";
import dayjs from "dayjs";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { MyNotesQuery } from "../graphql/generated";

type MyNotesItemProps = {
  note: MyNotesQuery["notes"][number];
  onPress: () => void;
};

const MyNotesItem = ({ note, onPress }: MyNotesItemProps) => {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.container, { opacity: pressed ? 0.6 : 1 }]}>
      <View style={styles.contentContainer}>
        <Text style={styles.contentText} numberOfLines={2}>
          {note.content}
        </Text>
        <Text>Created {dayjs(note.createdAt).format("LLL")}</Text>
      </View>
      <Ionicons name="chevron-forward" size={18} color="black" />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "lightgray",
    padding: 8,
    marginBottom: 8,
  },
  contentContainer: {
    flexDirection: "column",
  },
  contentText: {
    fontWeight: "bold",
    marginBottom: 2,
  },
});

export default MyNotesItem;
