import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useCallback } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

import CreateNoteForm, { CreateNoteFormData } from "../components/CreateNoteForm";
import KeyboardAvoidingView from "../components/KeyboardAvoidingView";
import { useLocation } from "../context/LocationContext";
import { useCreateNoteMutation } from "../graphql/generated";
import { MapStackParamList } from "../navigation/MapStack";

type CreateNoteScreenNavigationProp = StackNavigationProp<MapStackParamList, "CreateNote">;

const CreateNoteScreen = () => {
  const { loading: locationLoading, granted, location } = useLocation();
  const navigation = useNavigation<CreateNoteScreenNavigationProp>();
  const [createNote] = useCreateNoteMutation();

  const handleSubmit = useCallback(
    async (fields: CreateNoteFormData) => {
      await createNote({
        variables: { content: fields.content, latitude: location.latitude, longitude: location.longitude },
        refetchQueries: ["Notes"],
        awaitRefetchQueries: true,
      });

      navigation.pop();
    },
    [createNote, location]
  );

  if (locationLoading) {
    return (
      <View style={StyleSheet.absoluteFill}>
        <ActivityIndicator />
      </View>
    );
  }

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
  },
});

export default CreateNoteScreen;
