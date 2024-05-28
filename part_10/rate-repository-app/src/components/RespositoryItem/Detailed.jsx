import React from "react";
import { Linking, View, Pressable, StyleSheet } from "react-native";
import { useParams } from "react-router-native";

import useRepository from "../../hooks/useRepository";

import Text from "../Text";
import RepositoryItem from "./RepositoryItem";

const styles = StyleSheet.create({
  buttonContainer: {
    margin: 12,
    width: 200,
  },
  button: {
    backgroundColor: "#426FBD",
    padding: 10,
    alignItems: "center",
    borderRadius: 5,
  },
});

const Detailed = () => {
  const { id } = useParams();
  const { repository, loading } = useRepository(id);

  if (loading) {
    return null;
  }

  const item = {
    fullName: repository.fullName,
    description: repository.description,
    language: repository.language,
    forksCount: repository.forksCount,
    stargazersCount: repository.stargazersCount,
    ratingAverage: repository.ratingAverage,
    reviewCount: repository.reviewCount,
    ownerAvatarUrl: repository.ownerAvatarUrl,
  };

  return (
    <View
      style={{
        flexDirection: "column",
        marginTop: 10,
        backgroundColor: "#ffffff",
      }}
    >
      <RepositoryItem item={item} />
      <View style={styles.buttonContainer}>
        <Pressable
          style={styles.button}
          onPress={() => Linking.openURL(repository.url)}
        >
          <Text color="textSecondary" fontWeight="bold">
            Open in GitHub
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Detailed;
