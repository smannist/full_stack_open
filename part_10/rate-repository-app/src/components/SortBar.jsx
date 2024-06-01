import { View, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useState } from "react";

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  pickerContainer: {
    height: 50,
  },
  picker: {
    height: 50,
    borderWidth: 0,
    backgroundColor: "#e1e4e8",
  },
});

const SortBar = ({ setOrderBy, setOrderDirection }) => {
  const [selectedOrdering, setSelectedOrdering] = useState("latest");

  const sortRepositories = (itemValue) => {
    setSelectedOrdering(itemValue);

    switch (itemValue) {
      case "latest":
        setOrderBy("CREATED_AT");
        setOrderDirection("DESC");
        break;
      case "highest":
        setOrderBy("RATING_AVERAGE");
        setOrderDirection("DESC");
        break;
      case "lowest":
        setOrderBy("RATING_AVERAGE");
        setOrderDirection("ASC");
        break;
      default:
        break;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedOrdering}
          onValueChange={sortRepositories}
          style={styles.picker}
        >
          <Picker.Item label="Latest repositories" value="latest" />
          <Picker.Item label="Highest rated repositories" value="highest" />
          <Picker.Item label="Lowest rated repositories" value="lowest" />
        </Picker>
      </View>
    </View>
  );
};

export default SortBar;
