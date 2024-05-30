import { FlatList } from "react-native";
import { useParams } from "react-router-native";

import useRepository from "../../hooks/useRepository";

import ReviewItem from "./ReviewItem";
import ItemSeparator from "../ItemSeparator";
import RepositoryInfo from "./RepositoryInfo";

const SingleRepository = () => {
  const { id } = useParams();
  const { repository, loading } = useRepository(id);

  if (loading) {
    return null;
  }

  return (
    <FlatList
      style={{ marginLeft: 5, marginRight: 5 }}
      data={repository.reviews.edges}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={(item) => item.node.id}
      ListHeaderComponent={() => <RepositoryInfo repository={repository} />}
    />
  );
};

export default SingleRepository;
