import { FlatList } from "react-native";
import { useQuery } from "@apollo/client";

import ReviewItem from "../components/RespositoryItem/ReviewItem";
import ItemSeparator from "./ItemSeparator";

import { USER } from "../graphql/queries";

const MyReviews = () => {
  const { data, loading } = useQuery(USER, {
    fetchPolicy: "cache-and-network",
    variables: { includeReviews: true },
  });

  if (loading) {
    return null;
  }

  const reviewNodes = data?.me?.reviews
    ? data.me.reviews.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      style={{ marginLeft: 5, marginRight: 5 }}
      data={reviewNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={(item) => item.id}
    />
  );
};

export default MyReviews;
