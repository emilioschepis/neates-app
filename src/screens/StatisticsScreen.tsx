import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import React from "react";
import { View, StyleSheet, ActivityIndicator, Text } from "react-native";

import { useStatisticsQuery } from "../graphql/generated";

const StatisticsScreen = () => {
  const theme = useTheme();
  const { data, loading } = useStatisticsQuery();

  if (loading || !data) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.statisticsItem}>
        <View style={styles.row}>
          <Ionicons name="pencil" color={theme.colors.primary} size={18} />
          <Text style={styles.statisticsText}>Notes created</Text>
          <Text style={[styles.statisticsValue, { color: theme.colors.primary }]}>
            {data.notes.aggregate?.count ?? 0}
          </Text>
        </View>
      </View>
      <View style={styles.statisticsItem}>
        <View style={styles.row}>
          <Ionicons name="eye" color={theme.colors.primary} size={18} />
          <Text style={styles.statisticsText}>Total number of views</Text>
          <Text style={[styles.statisticsValue, { color: theme.colors.primary }]}>
            {data.views.aggregate?.count ?? 0}
          </Text>
        </View>
      </View>
      <View style={styles.statisticsItem}>
        <View style={styles.row}>
          <Ionicons name="trophy" color={theme.colors.primary} size={18} />
          <Text style={styles.statisticsText}>Your top {data.most_viewed.length} most viewed notes are</Text>
        </View>
        <View style={styles.mostViewed}>
          {data.most_viewed.map((note, idx) => (
            <View
              key={note.id}
              style={[styles.mostViewedItem, idx < data.most_viewed.length - 1 && styles.mostViewedBorder]}
            >
              <Text numberOfLines={1} style={styles.mostViewedContent}>
                {note.content}
              </Text>
              <Text style={[styles.mostViewedValue, { color: theme.colors.primary }]}>
                {note.views_aggregate.aggregate?.count ?? 0}
              </Text>
            </View>
          ))}
        </View>
      </View>
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
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  statisticsItem: {
    padding: 16,
    backgroundColor: "white",
    borderRadius: 8,
    marginBottom: 8,
  },
  statisticsText: {
    // fontSize: 16,
    fontWeight: "bold",
    marginHorizontal: 8,
    flex: 1,
  },
  statisticsValue: {
    fontSize: 18,
    fontWeight: "bold",
  },
  mostViewed: {
    marginTop: 8,
  },
  mostViewedItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 16,
  },
  mostViewedContent: {
    fontSize: 14,
    fontStyle: "italic",
    flex: 1,
  },
  mostViewedValue: {
    fontSize: 14,
    fontWeight: "bold",
  },
  mostViewedBorder: {
    borderBottomWidth: 1,
    borderBottomColor: "lightgray",
    paddingBottom: 16,
  },
});

export default StatisticsScreen;
