import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useTheme } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useCallback, useState } from "react";
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from "react-native";

import Button from "../components/core/Button";
import { useAuth } from "../context/AuthContext";
import firebase from "../firebase/firebase";
import { useUserQuery } from "../graphql/generated";
import { ProfileStackParamList } from "../navigation/ProfileStack";

type ProfileScreenNavigationProp = StackNavigationProp<ProfileStackParamList, "Profile">;

const ProfileScreen = () => {
  const theme = useTheme();
  const { user } = useAuth();
  const { loading, data } = useUserQuery({ variables: { userId: user.id } });
  const navigation = useNavigation<ProfileScreenNavigationProp>();
  const [signingOut, setSigningOut] = useState(false);
  const handleSignOut = useCallback(() => {
    setSigningOut(true);
    firebase
      .auth()
      .signOut()
      .catch(() => setSigningOut(false));
  }, []);

  if (loading || !data) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.helloText}>
        Hello, <Text style={styles.usernameText}>{data.user?.username}</Text>
      </Text>

      <View style={styles.actions}>
        <View style={styles.row}>
          <Pressable
            onPress={() => navigation.navigate("MyNotes")}
            style={({ pressed }) => [styles.box, { opacity: pressed ? 0.6 : 1 }]}
          >
            <Ionicons name="grid" size={24} color={theme.colors.primary} />
            <Text numberOfLines={1} style={styles.boxText}>
              View my notes
            </Text>
          </Pressable>
          <View style={styles.spacer} />
          <View style={styles.box} />
        </View>
      </View>

      <Button loading={signingOut} onPress={handleSignOut}>
        Sign out
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  loader: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
  helloText: {
    fontSize: 18,
  },
  usernameText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  actions: {
    flex: 1,
  },
  row: {
    marginTop: 8,
    flexDirection: "row",
  },
  box: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "flex-start",
    padding: 8,
    height: 100,
    backgroundColor: "white",
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "lightgray",
  },
  boxText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  spacer: {
    width: 8,
  },
});

export default ProfileScreen;
