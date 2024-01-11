import React from "react";

const successMessages = {
  add: (newName) => `Added ${newName} to the phonebook`,
  remove: (name) => `Removed ${name} from the phonebook`,
  update: (name) => `Updated ${name}`,
};

const failureMessages = {
  alreadyRemoved: (name) =>
    `Information of ${name} has already been removed from the server`,
  mongoValidator: (error) => `${error.response.data.error}`
};

const Notification = ({ message, type }) => {
  if (message === null) {
    return null;
  }

  return <div className={type}>{message}</div>;
};

export { successMessages, failureMessages };
export default Notification;
