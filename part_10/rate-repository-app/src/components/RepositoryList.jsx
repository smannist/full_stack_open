import { FlatList } from "react-native";

import useRepositories from "../hooks/useRepositories";

import RepositoryItem from "../components/RespositoryItem/RepositoryItem";
import ItemSeparator from "../components/ItemSeparator";

export const RepositoryListContainer = ({ repositories }) => {
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      style={{ marginLeft: 5, marginRight: 5 }}
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <RepositoryItem item={item} />}
      keyExtractor={(item) => item.id}
    />
  );
};

const RepositoryList = () => {
  const { repositories } = useRepositories();

  return <RepositoryListContainer repositories={repositories} />;
};

export default RepositoryList;
