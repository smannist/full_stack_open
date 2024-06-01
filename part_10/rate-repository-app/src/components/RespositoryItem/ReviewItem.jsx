import { View, StyleSheet } from "react-native";
import { formatDateValue } from "../../utils/format";
import { useLocation } from "react-router-native";
import theme from "../../theme";
import TextRow from "./TextRow";

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
  const location = useLocation();

  const isMyReviews = location.pathname === "/myreviews";

  let ratingColor = "";

  switch (true) {
    case review.rating >= 71:
      ratingColor = "primary";
      break;
    case review.rating >= 40:
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
          value={review.rating}
        />
      </View>
      <View style={styles.textContainer}>
        {isMyReviews ? (
          <TextRow fontWeight="bold" value={review.repository.fullName} />
        ) : (
          <TextRow fontWeight="bold" value={review.user.username} />
        )}
        <TextRow value={formatDateValue(review.createdAt)} color="dimmed" />
        <TextRow value={review.text} />
      </View>
    </View>
  );
};

export default ReviewItem;
