import React from "react";
import { View, Text, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    marginTop: 10
  },
    row: {
      flexDirection: "row",
      paddingVertical: 2,
    },
  label: {
    fontWeight: "bold",
    marginRight: 5,
  },
  value: {
    flex: 1,
  },
});

// even the rows could be their own component cause there is a lot of repetition, but im skipping it for sake of exercise

const RepositoryItem = ({
  id,
  fullName,
  description,
  language,
  forksCount,
  stargazersCount,
  ratingAverage,
  reviewCount,
}) => {
  return (
    <View key={id} style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.label}>Full name:</Text>
        <Text style={styles.value}>{fullName}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Description:</Text>
        <Text style={styles.value}>{description}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Language:</Text>
        <Text style={styles.value}>{language}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Stars:</Text>
        <Text style={styles.value}>{stargazersCount}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Forks:</Text>
        <Text style={styles.value}>{forksCount}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Reviews:</Text>
        <Text style={styles.value}>{reviewCount}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Rating:</Text>
        <Text style={styles.value}>{ratingAverage}</Text>
      </View>
    </View>
  );
};

export default RepositoryItem;
