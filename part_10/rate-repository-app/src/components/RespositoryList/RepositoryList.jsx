import React from "react";
import { useState } from "react";
import { FlatList } from "react-native";
import { useDebounce } from "use-debounce";

import useRepositories from "../../hooks/useRepositories";

import RepositoryItem from "../RespositoryItem/RepositoryItem";
import ItemSeparator from "../ItemSeparator";
import RepositoryListHeader from "../RespositoryList/RepositoryListHeader";

class RepositoryListContainer extends React.Component {
  renderHeader = () => {
    const { setOrderBy, setOrderDirection, setKeyword } = this.props;

    return (
      <RepositoryListHeader
        setOrderBy={setOrderBy}
        setOrderDirection={setOrderDirection}
        setKeyword={setKeyword}
      />
    );
  };

  render() {
    const { repositories } = this.props;

    const repositoryNodes = repositories
      ? repositories.edges.map((edge) => edge.node)
      : [];

    return (
      <FlatList
        style={{ marginLeft: 5, marginRight: 5 }}
        data={repositoryNodes}
        ListHeaderComponent={this.renderHeader}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({ item }) => <RepositoryItem item={item} />}
        keyExtractor={(item) => item.id}
      />
    );
  }
}

const RepositoryList = () => {
  const [orderBy, setOrderBy] = useState("CREATED_AT");
  const [orderDirection, setOrderDirection] = useState("DESC");
  const [keyword, setKeyword] = useState("");
  const [searchKeyword] = useDebounce(keyword, 500);

  const { repositories } = useRepositories(
    orderBy,
    orderDirection,
    searchKeyword
  );

  return (
    <RepositoryListContainer
      repositories={repositories}
      setOrderBy={setOrderBy}
      setOrderDirection={setOrderDirection}
      setKeyword={setKeyword}
    />
  );
};

export default RepositoryList;
