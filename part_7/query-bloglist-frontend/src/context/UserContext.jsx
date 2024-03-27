import React, { createContext, useReducer, useContext } from "react";

const userReducer = (state = null, action) => {
  switch (action.type) {
    case "LOGIN": {
      return action.payload;
    }
    default:
      return state;
  }
};

const UserContext = createContext();

export const UserContextProvider = (props) => {
  const [user, userDispatch] = useReducer(userReducer, null);

  return (
    <UserContext.Provider value={[user, userDispatch]}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContext;
