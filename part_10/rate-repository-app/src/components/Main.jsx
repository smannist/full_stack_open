import { View } from "react-native";

import RepositoryList from "./RepositoryList";
import AppBar from "./AppBar/AppBar";

const Main = () => {
  return (
    <View style={{ flexGrow: 1, flexShrink: 1, backgroundColor: "#e1e4e8" }}>
      <AppBar />
      <RepositoryList />
    </View>
  );
};

export default Main;
