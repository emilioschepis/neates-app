import React, { useCallback } from "react";
import { View, StyleSheet, Text } from "react-native";

import SignUpForm, { SignUpFormData } from "../components/SignUpForm";
import firebase from "../firebase/firebase";

const SignUpScreen = () => {
  const handleSignUp = useCallback(async (fields: SignUpFormData) => {
    await firebase.auth().createUserWithEmailAndPassword(fields.email, fields.password);
  }, []);

  return (
    <View style={styles.container}>
      <Text>
        Welcome to <Text>Geonotes</Text>
      </Text>
      <Text>Sign up now to create your own notes!</Text>
      <SignUpForm onSubmit={handleSignUp} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SignUpScreen;
