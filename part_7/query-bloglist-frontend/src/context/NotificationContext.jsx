import React, { createContext, useReducer, useContext } from "react";

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "SHOW": {
      return {
        className: action.payload.className,
        message: action.payload.message,
      };
    }
    case "HIDE":
      return { className: null, message: "" };
    default:
      return state;
  }
};

const NotificationContext = createContext();

export const useNotificationMessage = () => {
  const notificationAndDispatch = useContext(NotificationContext);
  return notificationAndDispatch
    ? notificationAndDispatch[0]
    : { className: "", message: null };
};

export const useNotificationDispatch = () => {
  const notificationAndDispatch = useContext(NotificationContext);
  return notificationAndDispatch ? notificationAndDispatch[1] : () => {};
};

export const handleNotification = (notificationDispatch, message, className) => {
  notificationDispatch({
    type: "SHOW",
    payload: {
      message: message,
      className: className,
    },
  });
  setTimeout(() => {
    notificationDispatch({ type: "HIDE" });
  }, 5000);
};

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, {
    className: "",
    message: null,
  });

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;
