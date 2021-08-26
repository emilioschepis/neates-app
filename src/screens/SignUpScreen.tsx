import { useNavigation, useTheme } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useCallback, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import KeyboardAvoidingView from "../components/KeyboardAvoidingView";
import SignUpForm, { SignUpFormData } from "../components/SignUpForm";
import firebase from "../firebase/firebase";
import { ProfileStackParamList } from "../navigation/ProfileStack";

type SignUpScreenNavigationProp = NativeStackNavigationProp<ProfileStackParamList, "SignUp">;

const SignUpScreen = () => {
  const theme = useTheme();
  const navigation = useNavigation<SignUpScreenNavigationProp>();
  const [error, setError] = useState<string | null>(null);

  const handleSignUp = useCallback(async (fields: SignUpFormData) => {
    setError(null);

    await firebase
      .auth()
      .createUserWithEmailAndPassword(fields.email, fields.password)
      .catch((error) => setError(error.message));
  }, []);

  const handleSignIn = () => navigation.navigate("SignIn");

  return (
    <KeyboardAvoidingView style={styles.container}>
      <Text style={styles.welcomeText}>
        Welcome to <Text style={{ color: theme.colors.primary }}>Neates</Text>
      </Text>
      <Text style={styles.promptText}>
        Sign up now to create your own notes and share them with people around the world.
      </Text>
      <SignUpForm error={error} onSubmit={handleSignUp} />
      <View style={styles.signInContainer}>
        <Text style={styles.signInPromptText}>Already have an account?</Text>
        <Pressable
          onPress={handleSignIn}
          style={({ pressed }) => [styles.signInButton, { opacity: pressed ? 0.6 : 1.0 }]}
        >
          <Text style={[styles.signInText, { color: theme.colors.primary }]}>Sign in instead</Text>
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
  signInPromptText: {
    fontStyle: "italic",
  },
  signInButton: {
    marginLeft: 4,
  },
  signInText: {
    fontWeight: "bold",
  },
});

export default SignUpScreen;
