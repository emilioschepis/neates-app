import React from "react";
import { View, StyleSheet, Button } from "react-native";

type CreateNoteFormProps = {
  onSubmit: (content: string) => Promise<void> | void;
};

const CreateNoteForm = ({ onSubmit }: CreateNoteFormProps) => {
  return (
    <View style={styles.container}>
      <Button title="Create a note here" onPress={() => onSubmit("Dynamic note.")} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default CreateNoteForm;
