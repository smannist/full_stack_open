import { Pressable, StyleSheet } from "react-native";

import Text from "./Text";

const styles = StyleSheet.create({
  text: {
    color: "#FFFFFF",
    fontWeight: "bold",
    paddingBottom: 10,
    paddingLeft: 10,
  },
});

const AppBarTab = () => {
  return (
    <Pressable onPress={() => null}>
      <Text style={styles.text}>Repositories</Text>
    </Pressable>
  );
};

export default AppBarTab;
