import { FlatList } from "react-native";

import useRepositories from "../hooks/useRepositories";

import RepositoryItem from "../components/RespositoryItem/RepositoryItem";
import ItemSeparator from "../components/ItemSeparator";

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
