import React from "react";
import { View } from "react-native";

import RepositoryItemRow from "../RespositoryItem/RepositoryItemRow";

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
  },
}) => {
  return (
    <View key={id} style={{ marginTop: 10 }}>
      <RepositoryItemRow label="Full name" value={fullName} />
      <RepositoryItemRow label="Description" value={description} />
      <RepositoryItemRow label="Language" value={language} />
      <RepositoryItemRow label="Stars" value={stargazersCount} />
      <RepositoryItemRow label="Forks" value={forksCount} />
      <RepositoryItemRow label="Reviews" value={reviewCount} />
      <RepositoryItemRow label="Rating" value={ratingAverage} />
    </View>
  );
};

export default RepositoryItem;
