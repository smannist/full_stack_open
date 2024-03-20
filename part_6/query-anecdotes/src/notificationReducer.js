const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case "SHOW":
      return action.payload;
    case "CLEAR":
      return null;
    default:
      return state;
  }
};

export default notificationReducer;
