import { useSelector } from "react-redux";

const Notification = () => {
  const notification = useSelector(state => state.notification);

  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    marginBottom: 20,
    borderColor: "green",
    color: "black",
    backgroundColor: "lightgreen",
    maxWidth: 400,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  };

  if (notification === null) {
    return null;
  }

  return (
    <div style={style}>
      {notification}
    </div>
  )
};

export default Notification;
