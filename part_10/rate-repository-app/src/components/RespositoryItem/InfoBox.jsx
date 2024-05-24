import { View, Image, StyleSheet } from "react-native";

import TextRow from "./TextRow";
import LangRow from "./LangRow";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  langContainer: {
    flexDirection: "row",
    paddingVertical: 2,
    paddingBottom: 5,
  },
  smallLogo: {
    width: 70,
    height: 70,
    borderRadius: 10,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
});

const InfoBox = ({ fullName, description, language, ownerAvatarUrl }) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: ownerAvatarUrl }} style={styles.smallLogo} />
      <View style={styles.textContainer}>
        <TextRow value={fullName} fontWeight="bold" />
        <TextRow value={description} />
        <View style={styles.langContainer}>
          <LangRow value={language} />
        </View>
      </View>
    </View>
  );
};

export default InfoBox;
