import { Pressable, View } from "react-native";
import { Link } from "react-router-native";

import Text from "../Text";

const AppBarTab = () => {
  return (
    <View style={{ flexDirection: "row", marginTop: 10 }}>
      <Link to="/" component={Pressable} style={{ marginRight: 10 }}>
        <Text
          fontWeight="bold"
          color="textSecondary"
          textLeftPadding="medium"
          textBottomPadding="medium"
        >
          Repositories
        </Text>
      </Link>
      <Link to="/sign" component={Pressable}>
        <Text
          fontWeight="bold"
          color="textSecondary"
          textLeftPadding="medium"
          textBottomPadding="medium"
        >
          Sign in
        </Text>
      </Link>
    </View>
  );
};

export default AppBarTab;
