import { Pressable } from "react-native";

import Text from "../Text";

const AppBarTab = () => {
  return (
    <Pressable onPress={() => null}>
      <Text
        fontWeight="bold"
        color="textSecondary"
        textLeftPadding="medium"
        textBottomPadding="medium"
      >
        Repositories
      </Text>
    </Pressable>
  );
};

export default AppBarTab;
