import React, { useCallback } from "react";
import { View, StyleSheet, Button } from "react-native";

import firebase from "../firebase/firebase";

const ProfileScreen = () => {
  const handleSignOut = useCallback(() => firebase.auth().signOut(), []);

  return (
    <View style={styles.container}>
      <Button title="Sign out" onPress={handleSignOut} />
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

export default ProfileScreen;
