import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import dayjs from "dayjs";
import React, { useCallback } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

import DestructiveButton from "../components/core/DestructiveButton";
import { useDeleteNoteMutation, useMyNoteQuery } from "../graphql/generated";
import { ProfileStackParamList } from "../navigation/ProfileStack";
import { updateCacheAfterDeleteNote } from "../utils/cacheUtils";

type MyNoteDetailScreenNavigationProp = StackNavigationProp<ProfileStackParamList, "MyNoteDetail">;
type MyNoteDetailScreenRouteProp = RouteProp<ProfileStackParamList, "MyNoteDetail">;

const MyNoteDetailScreen = () => {
  const route = useRoute<MyNoteDetailScreenRouteProp>();
  const navigation = useNavigation<MyNoteDetailScreenNavigationProp>();
  const { loading, data } = useMyNoteQuery({ variables: { noteId: route.params.id } });
  const [deleteNote, { loading: deleting }] = useDeleteNoteMutation({
    variables: { noteId: route.params.id },
    update: (cache, { data }) => updateCacheAfterDeleteNote(cache, data ?? {}),
  });

  const handleDelete = useCallback(() => {
    deleteNote().then(() => navigation.pop());
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Text>{route.params.content}</Text>
      </View>
      <View style={styles.infoContainer}>
        {loading || !data ? (
          <View style={styles.loader}>
            <ActivityIndicator />
          </View>
        ) : (
          <View style={styles.infoContainer}>
            <Text style={styles.infoText}>Info about this note:</Text>
            <Text style={styles.infoDetailText}>Created {dayjs(data.note?.createdAt).format("LLL")}</Text>
            <Text style={styles.infoDetailText}>
              Located at {data.note?.location.coordinates[1]} {data.note?.location.coordinates[0]}
            </Text>
          </View>
        )}
        <DestructiveButton
          loading={deleting}
          confirmationMessage="Deleting this note is irreversible."
          onPress={handleDelete}
        >
          Delete note
        </DestructiveButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  contentContainer: {
    padding: 8,
    backgroundColor: "yellow",
    borderWidth: 2,
    borderColor: "rgb(192, 192, 0)",
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  infoContainer: {
    flex: 1,
    marginVertical: 8,
  },
  infoText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  infoDetailText: {
    marginTop: 4,
  },
});

export default MyNoteDetailScreen;
