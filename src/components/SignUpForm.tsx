import { Ionicons } from "@expo/vector-icons";
import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { StyleSheet, Text, View } from "react-native";
import * as yup from "yup";

import Button from "./core/Button";
import Input from "./core/Input";

export type SignUpFormData = {
  email: string;
  password: string;
};

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(6),
});

type SignUpFormProps = {
  error: string | null;
  onSubmit: (fields: SignUpFormData) => Promise<void>;
};

const SignUpForm = ({ error, onSubmit }: SignUpFormProps) => {
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
          <Input
            autoCapitalize="none"
            label="Email address"
            placeholder="Enter your email address"
            keyboardType="email-address"
            textContentType="emailAddress"
            text={value}
            onBlur={onBlur}
            onChangeText={onChange}
            style={styles.input}
            error={errors.email?.message}
          />
        )}
      />
      <Controller
        name="password"
        defaultValue=""
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            secureTextEntry
            autoCapitalize="none"
            label="Password"
            placeholder="Choose a password"
            textContentType="newPassword"
            text={value}
            onBlur={onBlur}
            onChangeText={onChange}
            style={styles.input}
            error={errors.password?.message}
          />
        )}
      />

      {error ? (
        <View style={styles.errorContainer}>
          <Ionicons name="alert-circle" color="red" size={16} />
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : null}

      <Button loading={isSubmitting} onPress={handleSubmit(onSubmit)}>
        Sign up
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  input: {
    marginBottom: 12,
  },
  errorContainer: {
    flexDirection: "row",
    marginBottom: 12,
    alignItems: "center",
  },
  errorText: {
    marginLeft: 4,
    color: "red",
    flexShrink: 1,
  },
});

export default SignUpForm;
