import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useCallback } from "react";
import { View, StyleSheet, Button, Text } from "react-native";

import { useAuth } from "../context/AuthContext";
import firebase from "../firebase/firebase";
import { ProfileStackParamList } from "../navigation/ProfileStack";

type MapScreenNavigationProp = StackNavigationProp<ProfileStackParamList, "Profile">;

const ProfileScreen = () => {
  const { user } = useAuth();
  const navigation = useNavigation<MapScreenNavigationProp>();
  const handleSignOut = useCallback(() => firebase.auth().signOut(), []);

  if (!user) {
    throw new Error("Should not be able to see ProfileScreen without an user.");
  }

  return (
    <View style={styles.container}>
      <Text>Hello, {user.email}</Text>
      <Button title="View your notes" onPress={() => navigation.navigate("MyNotes")} />
      <Button title="Sign out" onPress={handleSignOut} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ProfileScreen;
