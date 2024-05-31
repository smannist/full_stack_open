import { Pressable, View } from "react-native";
import { Link } from "react-router-native";

import { useApolloClient, useQuery } from "@apollo/client";

import { USER } from "../../graphql/queries";

import Text from "../Text";
import useAuthStorage from "../../hooks/useAuthStorage";

const AppBarTab = () => {
  const apolloClient = useApolloClient();
  const authStorage = useAuthStorage();

  const { data } = useQuery(USER, {
    fetchPolicy: "cache-and-network",
  });

  const signOut = () => {
    authStorage.removeAccessToken();
    apolloClient.resetStore();
  };

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
      {data && data.me ? (
        <>
          <Link to="/review" component={Pressable} style={{ marginRight: 10 }}>
            <Text
              fontWeight="bold"
              color="textSecondary"
              textLeftPadding="medium"
              textBottomPadding="medium"
            >
              Create a review
            </Text>
          </Link>
          <Pressable onPress={signOut}>
            <Text
              fontWeight="bold"
              color="textSecondary"
              textLeftPadding="medium"
              textBottomPadding="medium"
            >
              Sign out
            </Text>
          </Pressable>
        </>
      ) : (
        <>
          <Link to="/signin" component={Pressable} style={{ marginRight: 10 }}>
            <Text
              fontWeight="bold"
              color="textSecondary"
              textLeftPadding="medium"
              textBottomPadding="medium"
            >
              Sign in
            </Text>
          </Link>
          <Link to="/signup" component={Pressable}>
            <Text
              fontWeight="bold"
              color="textSecondary"
              textLeftPadding="medium"
              textBottomPadding="medium"
            >
              Sign up
            </Text>
          </Link>
        </>
      )}
    </View>
  );
};

export default AppBarTab;
