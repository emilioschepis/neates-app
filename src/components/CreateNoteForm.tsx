import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import * as yup from "yup";

export type CreateNoteFormData = {
  content: string;
};

const schema = yup.object().shape({
  content: yup.string().required(),
});

type CreateNoteFormProps = {
  onSubmit: (fields: CreateNoteFormData) => Promise<void>;
};

const CreateNoteForm = ({ onSubmit }: CreateNoteFormProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateNoteFormData>({
    resolver: yupResolver(schema),
  });

  return (
    <View style={styles.container}>
      <Controller
        name="content"
        defaultValue=""
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            multiline
            placeholder="Your note's content"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors.content && <Text>{errors.content.message}</Text>}
      <Button title="Submit" disabled={isSubmitting} onPress={handleSubmit(onSubmit)}>
        Create a new note here
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
  },
  input: {
    flex: 1,
    padding: 8,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 8,
  },
});

export default CreateNoteForm;
