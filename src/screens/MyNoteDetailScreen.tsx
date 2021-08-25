import { Ionicons } from "@expo/vector-icons";
import { RouteProp, useNavigation, useRoute, useTheme } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import dayjs from "dayjs";
import React, { useCallback } from "react";
import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, View } from "react-native";

import DestructiveButton from "../components/core/DestructiveButton";
import Spacer from "../components/core/Spacer";
import { useDeleteNoteMutation, useMyNoteQuery } from "../graphql/generated";
import { ProfileStackParamList } from "../navigation/ProfileStack";
import { updateCacheAfterDeleteNote, updateCacheWith } from "../utils/cacheUtils";

type MyNoteDetailScreenNavigationProp = StackNavigationProp<ProfileStackParamList, "MyNoteDetail">;
type MyNoteDetailScreenRouteProp = RouteProp<ProfileStackParamList, "MyNoteDetail">;

const MyNoteDetailScreen = () => {
  const theme = useTheme();
  const route = useRoute<MyNoteDetailScreenRouteProp>();
  const navigation = useNavigation<MyNoteDetailScreenNavigationProp>();
  const { loading, data } = useMyNoteQuery({ variables: { noteId: route.params.id } });
  const [deleteNote, { loading: deleting }] = useDeleteNoteMutation({
    variables: { noteId: route.params.id },
    update: updateCacheWith(updateCacheAfterDeleteNote),
  });

  const handleDelete = useCallback(() => {
    deleteNote().then(() => navigation.pop());
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.contentText}>{route.params.content}</Text>
      </View>
      {loading || !data ? (
        <View style={styles.loader}>
          <ActivityIndicator />
        </View>
      ) : (
        <View style={styles.infoContainer}>
          {data.note?.mapImageUrl ? (
            <>
              <View style={styles.infoElementContainer}>
                <Image resizeMode="contain" source={{ uri: data.note.mapImageUrl }} style={styles.mapImage} />
              </View>
              <Spacer height={16} />
            </>
          ) : null}
          <View style={styles.infoElementContainer}>
            <Ionicons name="eye" color={theme.colors.primary} size={20} />
            <Spacer width={8} />
            <Text>Viewed {data.note?.views_aggregate.aggregate?.count ?? 0} times</Text>
          </View>
          <Spacer height={16} />
          <View style={styles.infoElementContainer}>
            <Ionicons name="time" color={theme.colors.primary} size={20} />
            <Spacer width={8} />
            <Text>Created {dayjs(data.note?.createdAt).format("LLL")}</Text>
          </View>
          <Spacer height={16} />
          <DestructiveButton
            loading={deleting}
            confirmationMessage="Deleting this note is irreversible."
            onPress={handleDelete}
          >
            Delete note
          </DestructiveButton>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  contentContainer: {
    padding: 8,
    backgroundColor: "#FFC61E",
    borderWidth: 2,
    borderColor: "rgb(192, 192, 0)",
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  mapImage: {
    flex: 1,
    aspectRatio: 2,
    borderRadius: 8,
    borderColor: "lightgray",
    borderWidth: 2,
  },
  contentText: {
    fontSize: 16,
    fontStyle: "italic",
  },
  infoContainer: {
    marginTop: 16,
  },
  infoElementContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 8,
    backgroundColor: "white",
  },
});

export default MyNoteDetailScreen;
