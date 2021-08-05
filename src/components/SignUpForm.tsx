import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { TextInput, View, StyleSheet, Button, Text } from "react-native";
import * as yup from "yup";

type SignUpFormProps = {
  onSubmit: (fields: SignUpFormData) => Promise<void>;
};

export type SignUpFormData = {
  email: string;
  password: string;
};

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(6),
});

const SignUpForm = ({ onSubmit }: SignUpFormProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormData>({
    resolver: yupResolver(schema),
  });

  return (
    <View style={styles.container}>
      <Controller
        name="email"
        defaultValue=""
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Email address"
            keyboardType="email-address"
            textContentType="emailAddress"
            autoCapitalize="none"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors.email && <Text>{errors.email.message}</Text>}
      <Controller
        name="password"
        defaultValue=""
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            secureTextEntry
            style={styles.input}
            placeholder="Password"
            textContentType="newPassword"
            autoCapitalize="none"
            autoCorrect={false}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors.password && <Text>{errors.password.message}</Text>}
      <Button title="Submit" disabled={isSubmitting} onPress={handleSubmit(onSubmit)}>
        Sign up
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 8,
  },
  input: {
    padding: 8,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 8,
  },
});

export default SignUpForm;
