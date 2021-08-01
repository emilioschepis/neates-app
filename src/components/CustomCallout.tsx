import dayjs from "dayjs";
import React, { useMemo } from "react";
import { Dimensions, Text, View, StyleSheet } from "react-native";

import { NotesQuery } from "../graphql/generated";

type CustomCalloutProps = {
  note: NotesQuery["notes"][number];
};

const CustomCallout = ({ note }: CustomCalloutProps) => {
  const createdAt = useMemo(
    () => dayjs(note.createdAt).format("LLL"),
    [note.createdAt]
  );

  return (
    <View style={styles.container}>
      <Text numberOfLines={2}>{note.content}</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.infoStandardText}>
          Created by
          <Text style={styles.infoPrimaryText}> {note.user.username} </Text>
          on
          <Text style={styles.infoPrimaryText}> {createdAt}</Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get("screen").width,
  },
  infoContainer: {
    flexDirection: "row",
    marginTop: 4,
  },
  infoStandardText: {
    fontSize: 12,
  },
  infoPrimaryText: {
    fontWeight: "bold",
  },
});

export default CustomCallout;
