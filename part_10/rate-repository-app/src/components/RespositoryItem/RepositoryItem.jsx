import { View, StyleSheet } from "react-native";

import StatRow from "./StatRow";
import InfoBox from "./InfoBox";

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    padding: 10,
    backgroundColor: "#ffffff",
    marginTop: 10,
  },
});

const RepositoryItem = ({
  item: {
    id,
    fullName,
    description,
    language,
    forksCount,
    stargazersCount,
    ratingAverage,
    reviewCount,
    ownerAvatarUrl,
  },
}) => {
  return (
    <View key={id} style={styles.container}>
      <InfoBox
        fullName={fullName}
        description={description}
        ownerAvatarUrl={ownerAvatarUrl}
        language={language}
      />
      <StatRow
        stargazersCount={stargazersCount}
        forksCount={forksCount}
        reviewCount={reviewCount}
        ratingAverage={ratingAverage}
      />
    </View>
  );
};

export default RepositoryItem;
