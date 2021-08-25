import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import * as ExpoLocation from "expo-location";
import React, { useCallback } from "react";
import { StyleSheet, Text, View } from "react-native";

import CreateNoteForm, { CreateNoteFormData } from "../components/CreateNoteForm";
import KeyboardAvoidingView from "../components/KeyboardAvoidingView";
import { useLocation } from "../context/LocationContext";
import { useCreateNoteMutation } from "../graphql/generated";
import { MapStackParamList } from "../navigation/MapStack";
import { updateCacheAfterCreateNote, updateCacheWith } from "../utils/cacheUtils";

type CreateNoteScreenNavigationProp = NativeStackNavigationProp<MapStackParamList, "CreateNote">;

const CreateNoteScreen = () => {
  const { granted } = useLocation();
  const navigation = useNavigation<CreateNoteScreenNavigationProp>();
  const [createNote] = useCreateNoteMutation();

  const handleSubmit = useCallback(
    async (fields: CreateNoteFormData) => {
      // Retrieves the current location instead of the cached one from `useLocation`.
      const location = await ExpoLocation.getCurrentPositionAsync();

      await createNote({
        variables: {
          content: fields.content,
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        },
        update: updateCacheWith(updateCacheAfterCreateNote),
        refetchQueries: ["Notes"],
        awaitRefetchQueries: true,
      });

      navigation.pop();
    },
    [createNote, granted]
  );

  if (!granted) {
    return (
      <View style={styles.container}>
        <Text>Sorry, you can't create notes without allowing access to your location.</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView style={styles.container}>
      <CreateNoteForm onSubmit={handleSubmit} />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});

export default CreateNoteScreen;
