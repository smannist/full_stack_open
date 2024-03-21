const Notification = ({ notification }) => {
  const style = {
    backgroundColor: "#d4edda",
    color: "#0d6526",
    padding: "10px 15px",
    borderRadius: "4px",
    marginBottom: "20px",
    marginTop: "20px",
    border: "1px solid transparent",
    maxWidth: 600,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  };

  if (notification === null) {
    return null;
  }

  return <div style={style}>{notification}</div>;
};

export default Notification;
