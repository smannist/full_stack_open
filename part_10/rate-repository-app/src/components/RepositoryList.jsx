import { FlatList } from "react-native";
import { useState } from "react";

import useRepositories from "../hooks/useRepositories";

import RepositoryItem from "../components/RespositoryItem/RepositoryItem";
import ItemSeparator from "../components/ItemSeparator";
import SortBar from "./SortBar";

export const RepositoryListContainer = ({
  repositories,
  setOrderBy,
  setOrderDirection,
}) => {
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      style={{ marginLeft: 5, marginRight: 5 }}
      data={repositoryNodes}
      ListHeaderComponent={
        <SortBar
          setOrderBy={setOrderBy}
          setOrderDirection={setOrderDirection}
        />
      }
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <RepositoryItem item={item} />}
      keyExtractor={(item) => item.id}
    />
  );
};

const RepositoryList = () => {
  const [orderBy, setOrderBy] = useState("CREATED_AT");
  const [orderDirection, setOrderDirection] = useState("DESC");

  const { repositories } = useRepositories(orderBy, orderDirection);

  return (
    <RepositoryListContainer
      repositories={repositories}
      setOrderBy={setOrderBy}
      setOrderDirection={setOrderDirection}
    />
  );
};

export default RepositoryList;
