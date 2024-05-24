import { ScrollView, View } from "react-native";
import Constants from "expo-constants";
import theme from "../../theme";

import AppBarTab from "../AppBar/AppBarTab";

const AppBar = () => {
  return (
    <View
      style={{
        paddingTop: Constants.statusBarHeight,
        backgroundColor: theme.colors.textPrimary,
      }}
    >
      <ScrollView horizontal>
        <AppBarTab />
      </ScrollView>
    </View>
  );
};

export default AppBar;
