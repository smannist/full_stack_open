import { useState } from "react";
import { StyleSheet } from "react-native";
import { Searchbar } from "react-native-paper";

const styles = StyleSheet.create({
  searchBar: {
    height: 60,
    backgroundColor: "#FFFFFF",
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
    />
  );
};

export default SearchBar;
