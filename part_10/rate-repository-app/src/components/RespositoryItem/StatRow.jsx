import { View, StyleSheet } from "react-native";

import { formatStatValue } from "../../utils/format";

import Text from "../Text";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingVertical: 1,
    paddingBottom: 5,
  },
  statisticContainer: {
    alignItems: "center",
    marginRight: 60,
  },
});

const StatRow = ({
  stargazersCount,
  forksCount,
  reviewCount,
  ratingAverage,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.statisticContainer}>
        <Text fontWeight="bold">{formatStatValue(stargazersCount)}</Text>
        <Text>Stars</Text>
      </View>
      <View style={styles.statisticContainer}>
        <Text fontWeight="bold">{formatStatValue(forksCount)}</Text>
        <Text>Forks</Text>
      </View>
      <View style={styles.statisticContainer}>
        <Text fontWeight="bold">{formatStatValue(reviewCount)}</Text>
        <Text>Reviews</Text>
      </View>
      <View style={styles.statisticContainer}>
        <Text fontWeight="bold">{formatStatValue(ratingAverage)}</Text>
        <Text>Rating</Text>
      </View>
    </View>
  );
};

export default StatRow;
