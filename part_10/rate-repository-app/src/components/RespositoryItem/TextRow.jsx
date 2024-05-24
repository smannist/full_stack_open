import { View, StyleSheet } from "react-native";

import Text from "../Text";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingVertical: 2,
    paddingBottom: 5,
  },
});

const TextRow = ({ value, fontWeight }) => {
  return (
    <View style={styles.container}>
      <Text fontWeight={fontWeight}>{value}</Text>
    </View>
  );
};

export default TextRow;
