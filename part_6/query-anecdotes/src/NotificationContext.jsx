import { createContext, useReducer, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import notificationReducer from "./notificationReducer";

const NotificationContext = createContext();

export const useNotificationMessage = () => {
  const notificationAndDispatch = useContext(NotificationContext);
  return notificationAndDispatch[0];
};

export const useNotificationDispatch = () => {
  const notificationAndDispatch = useContext(NotificationContext);
  return notificationAndDispatch[1];
};

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    null
  );

  useEffect(() => {
    if (notification !== null) {
      const timeout = setTimeout(() => {
        notificationDispatch({ type: "CLEAR" });
      }, 5000);

      return () => clearTimeout(timeout);
    }
  }, [notification]);

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  );
};

NotificationContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default NotificationContext;
