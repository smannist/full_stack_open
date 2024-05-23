import Constants from "expo-constants";
import { Text, StyleSheet, View } from "react-native";
import RepositoryList from "./RepositoryList";

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    marginLeft: 5,
    flexGrow: 1,
    flexShrink: 1
  },
  text: {
    fontSize: 20,
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Rate Repository Application</Text>
      <RepositoryList />
    </View>
  );
};

export default Main;
