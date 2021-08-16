import { useNavigation, useTheme } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useCallback, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import KeyboardAvoidingView from "../components/KeyboardAvoidingView";
import SignInForm, { SignInFormData } from "../components/SignInForm";
import firebase from "../firebase/firebase";
import { ProfileStackParamList } from "../navigation/ProfileStack";

type SignInScreenNavigationProp = StackNavigationProp<ProfileStackParamList, "SignIn">;

const SignInScreen = () => {
  const theme = useTheme();
  const navigation = useNavigation<SignInScreenNavigationProp>();
  const [error, setError] = useState<string | null>(null);

  const handleSignIn = useCallback(async (fields: SignInFormData) => {
    setError(null);
    await firebase
      .auth()
      .signInWithEmailAndPassword(fields.email, fields.password)
      .catch((error) => setError(error.message));
  }, []);

  const handleSignUp = () => navigation.navigate("SignUp");

  return (
    <KeyboardAvoidingView style={styles.container}>
      <Text style={styles.welcomeText}>Welcome back</Text>
      <SignInForm error={error} onSubmit={handleSignIn} />
      <View style={styles.signInContainer}>
        <Text style={styles.signUpPromptText}>New to Geonotes?</Text>
        <Pressable
          onPress={handleSignUp}
          style={({ pressed }) => [styles.signUpButton, { opacity: pressed ? 0.6 : 1.0 }]}
        >
          <Text style={[styles.signUpText, { color: theme.colors.primary }]}>Sign up now</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  welcomeText: {
    fontSize: 28,
    marginBottom: 8,
    textAlign: "center",
    fontWeight: "bold",
  },
  promptText: {
    fontSize: 16,
    marginBottom: 16,
    textAlign: "center",
  },
  signInContainer: {
    flexDirection: "row",
    marginTop: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  signUpPromptText: {
    fontStyle: "italic",
  },
  signUpButton: {
    marginLeft: 4,
  },
  signUpText: {
    fontWeight: "bold",
  },
});

export default SignInScreen;
