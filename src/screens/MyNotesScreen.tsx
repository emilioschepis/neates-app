import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useCallback } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

import MyNotesList from "../components/MyNotesList";
import { useAuth } from "../context/AuthContext";
import { useMyNotesQuery } from "../graphql/generated";
import { ProfileStackParamList } from "../navigation/ProfileStack";

type MyNotesScreenNavigationProp = StackNavigationProp<ProfileStackParamList, "MyNotes">;

const MyNotesScreen = () => {
  const navigation = useNavigation<MyNotesScreenNavigationProp>();
  const { user } = useAuth();
  const { loading, data } = useMyNotesQuery({ variables: { userId: user.id } });

  const handleSelectNote = useCallback(
    (id: string) => {
      const note = data?.notes.find((note) => note.id === id);
      navigation.navigate("MyNoteDetail", { id, content: note?.content ?? "" });
    },
    [data, navigation]
  );

  if (loading || !data) {
    return (
      <View style={StyleSheet.absoluteFill}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MyNotesList notes={data.notes} onSelectNote={handleSelectNote} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default MyNotesScreen;
