import { FlatList, View } from "react-native";

import useRepositories from "../hooks/useRepositories";
import RepositoryItem from "../components/RespositoryItem/RepositoryItem";

const ItemSeparator = () => <View style={{ height: 10 }} />;

const RepositoryList = () => {
  const { repositories } = useRepositories();

  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      style={{ marginLeft: 5 }}
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <RepositoryItem item={item} />}
      keyExtractor={(item) => item.id}
    />
  );
};

export default RepositoryList;
