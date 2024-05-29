import { View, StyleSheet } from "react-native";
import theme from "../../theme";
import TextRow from "./TextRow";
import { formatDateValue } from "../../utils/format";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 10,
    backgroundColor: "#ffffff",
    marginTop: 5,
    marginBottom: 5,
  },
  ratingContainer: {
    marginRight: 10,
    borderStyle: "solid",
    borderRadius: 50,
    borderWidth: 3,
    width: 70,
    height: 70,
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    flex: 1,
  },
});

const ReviewItem = ({ review }) => {
  const reviewRating = review.node.rating;

  let ratingColor = "";

  switch (true) {
    case reviewRating >= 71:
      ratingColor = "primary";
      break;
    case reviewRating >= 40:
      ratingColor = "yellow";
      break;
    default:
      ratingColor = "red";
      break;
  }

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.ratingContainer,
          { borderColor: theme.colors[ratingColor] },
        ]}
      >
        <TextRow
          fontWeight={"bold"}
          fontSize={"subheading"}
          color={ratingColor}
          value={review.node.rating}
        />
      </View>
      <View style={styles.textContainer}>
        <TextRow fontWeight="bold" value={review.node.user.username} />
        <TextRow
          value={formatDateValue(review.node.createdAt)}
          color="dimmed"
        />
        <TextRow value={review.node.text} />
      </View>
    </View>
  );
};

export default ReviewItem;
