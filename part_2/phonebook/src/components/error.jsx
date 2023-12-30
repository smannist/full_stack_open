import React from "react";

const errorMessages =  {
  alreadyRemoved: (name) => `Information of ${name} has already been removed from the server`
};

const Error = ({ message }) => {
  if (message === null) {
    return null;
  }

  return <div className="error">{message}</div>;
};

export { errorMessages };
export default Error;
