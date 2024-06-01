import { useState } from "react";
import { StyleSheet } from "react-native";
import { Searchbar } from "react-native-paper";

import theme from "../theme";

const styles = StyleSheet.create({
  searchBar: {
    height: 60,
    margin: 20,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
  },
});

const SearchBar = ({ setKeyword }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const onSearch = (query) => {
    setSearchQuery(query);
    setKeyword(query);
  };

  return (
    <Searchbar
      placeholder="Search repositories"
      onChangeText={onSearch}
      value={searchQuery}
      style={styles.searchBar}
      icon="magnify"
      iconColor={theme.colors.primary}
    />
  );
};

export default SearchBar;
