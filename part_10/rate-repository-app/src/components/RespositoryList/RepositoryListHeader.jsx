import { View } from "react-native";
import SearchBar from "../SearchBar";
import SortBar from "../SortBar";

const RepositoryListHeader = ({
  setOrderBy,
  setOrderDirection,
  setKeyword,
}) => {
  return (
    <View style={{ marginTop: 10, marginRight: 10 }}>
      <SearchBar setKeyword={setKeyword} />
      <SortBar
        setOrderBy={setOrderBy}
        setOrderDirection={setOrderDirection}
      />
    </View>
  );
};

export default RepositoryListHeader;
