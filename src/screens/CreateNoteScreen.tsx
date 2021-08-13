import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useCallback } from "react";
import { StyleSheet, View } from "react-native";

import CreateNoteForm, { CreateNoteFormData } from "../components/CreateNoteForm";
import { NotesDocument, useCreateNoteMutation } from "../graphql/generated";
import { MapStackParamList } from "../navigation/MapStack";

type CreateNoteScreenNavigationProp = StackNavigationProp<MapStackParamList, "CreateNote">;
type CreateNoteScreenRouteProp = RouteProp<MapStackParamList, "CreateNote">;

const CreateNoteScreen = () => {
  const navigation = useNavigation<CreateNoteScreenNavigationProp>();
  const {
    params: { location },
  } = useRoute<CreateNoteScreenRouteProp>();
  const [createNote] = useCreateNoteMutation();

  const handleSubmit = useCallback(
    async (fields: CreateNoteFormData) => {
      await createNote({
        variables: { content: fields.content, latitude: location.latitude, longitude: location.longitude },
        refetchQueries: [NotesDocument],
        awaitRefetchQueries: true,
      });

      navigation.pop();
    },
    [createNote, location]
  );

  return (
    <View style={styles.container}>
      <CreateNoteForm onSubmit={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default CreateNoteScreen;
