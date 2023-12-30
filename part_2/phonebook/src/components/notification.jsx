import React from "react";

const notificationMessages =  {
  add: (newName) => `Added ${newName} to the phonebook`,
  remove: (name) => `Removed ${name} from the phonebook`,
  update: (name) => `Updated ${name}`
};

const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }

  return <div className="error">{message}</div>;
};

export { notificationMessages };
export default Notification;
