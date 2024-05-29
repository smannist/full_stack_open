import { Linking, View, Pressable, StyleSheet } from "react-native";

import Text from "../Text";
import RepositoryItem from "./RepositoryItem";

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    padding: 10,
    backgroundColor: "#ffffff",
    marginTop: 5,
    marginBottom: 5,
  },
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

const RepositoryInfo = ({ repository }) => {
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
    <View style={styles.container}>
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

export default RepositoryInfo;
