import { Ionicons } from "@expo/vector-icons";
import dayjs from "dayjs";
import React, { useMemo } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";

import { NoteQuery } from "../graphql/generated";

type NoteViewProps = {
  note: NoteQuery["note"]["data"];
};

const NoteView = ({ note }: NoteViewProps) => {
  const openAnimation = useSharedValue(2);
  const animatedFront = useAnimatedStyle(() => {
    return {
      opacity: openAnimation.value >= 1.5 ? 1 : 0,
      transform: [{ perspective: openAnimation.value * 180 }, { rotateY: `${openAnimation.value * 180}deg` }],
    };
  });

  const animatedBack = useAnimatedStyle(() => {
    return {
      opacity: openAnimation.value < 1.5 ? 1 : 0,
      transform: [
        { perspective: (openAnimation.value + 1) * 180 },
        { rotateY: `${(openAnimation.value + 1) * 180}deg` },
      ],
    };
  });

  const createdAt = useMemo(() => dayjs(note?.createdAt).format("LLL"), [note?.createdAt]);

  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => {
          openAnimation.value = withTiming(openAnimation.value === 1 ? 2 : 1, {
            duration: 350,
          });
        }}
      >
        <View style={styles.noteContainer}>
          <Animated.View style={[animatedFront, styles.note, styles.noteFront]}>
            <Text style={styles.noteContentText}>{note?.content}</Text>
          </Animated.View>
          <Animated.View style={[animatedBack, styles.note, styles.noteBack]}>
            <View style={styles.viewsContainer}>
              <Ionicons name="eye" size={18} color="black" />
              <Text numberOfLines={1} style={styles.viewsText}>
                Viewed by {note?.views_aggregate.aggregate?.count ?? 0} people
              </Text>
            </View>
            <View>
              <Text numberOfLines={1} style={styles.noteInfoText}>
                Created by <Text style={{ fontWeight: "bold" }}>{note?.user.username}</Text>,
              </Text>
              <Text numberOfLines={2} style={styles.noteInfoText}>
                {createdAt}
              </Text>
            </View>
          </Animated.View>
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  noteContainer: {
    position: "relative",
    width: "90%",
    aspectRatio: 1,
  },
  note: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: "yellow",
    borderColor: "rgb(192, 192, 0)",
    borderWidth: 2,
    padding: 16,
  },
  noteFront: {
    justifyContent: "center",
    alignItems: "center",
  },
  noteBack: {
    justifyContent: "space-between",
  },
  noteContentText: {
    fontSize: 16,
    fontStyle: "italic",
  },
  noteInfoText: {
    fontSize: 16,
  },
  viewsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  viewsText: {
    marginLeft: 4,
    fontSize: 16,
  },
});

export default NoteView;
