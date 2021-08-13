import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

import MyNotesList from "../components/MyNotesList";
import { useAuth } from "../context/AuthContext";
import { useMyNotesQuery } from "../graphql/generated";

const MyNotesScreen = () => {
  const { user } = useAuth();
  const { loading, data } = useMyNotesQuery({ variables: { userId: user?.id ?? "" } });

  if (loading || !data) {
    return (
      <View style={StyleSheet.absoluteFill}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MyNotesList notes={data.notes} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default MyNotesScreen;
