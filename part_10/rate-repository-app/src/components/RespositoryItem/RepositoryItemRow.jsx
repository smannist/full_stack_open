import React from "react";
import { View } from "react-native";

import Text from "../Text";

const RepositoryItemRow = ({ label, value }) => {
  return (
    <View style={{ flexDirection: "row", paddingVertical: 2 }}>
      <Text fontWeight="bold" textRightMargin="small">
        {label}:
      </Text>
      <Text>{value}</Text>
    </View>
  );
};

export default RepositoryItemRow;
