import { View, StyleSheet } from "react-native";

import Text from "../Text";

const styles = StyleSheet.create({
  container: {
    padding: 3,
    backgroundColor: "#426FBD",
    borderRadius: 5,
  },
});

const LangRow = ({ value }) => {
  return (
    <View style={styles.container}>
      <Text fontWeight="bold" color="textSecondary">
        {value}
      </Text>
    </View>
  );
};

export default LangRow;
