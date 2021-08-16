import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import * as yup from "yup";

import { NoteConstants } from "../utils/constants";
import Button from "./core/Button";
import Input from "./core/Input";

export type CreateNoteFormData = {
  content: string;
};

const schema = yup.object().shape({
  content: yup.string().max(NoteConstants.maximumLength).required(),
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
          <Input
            style={styles.input}
            multiline
            label="Note"
            placeholder="Your note's content"
            maxLength={NoteConstants.maximumLength}
            text={value}
            onBlur={onBlur}
            onChangeText={onChange}
            error={errors.content?.message}
          />
        )}
      />
      <Button loading={isSubmitting} onPress={handleSubmit(onSubmit)}>
        Create a new note here
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    flex: 1,
    marginBottom: 8,
  },
});

export default CreateNoteForm;
