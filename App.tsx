import { ApolloProvider } from "@apollo/client";
import React from "react";
import { StyleSheet, View } from "react-native";

import { AuthProvider } from "./src/context/AuthContext";
import client from "./src/graphql/client";

export default function App() {
  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <View style={styles.container} />
      </AuthProvider>
    </ApolloProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
