import React, { createContext, useReducer, useState } from "react";
const AppContext: any = createContext({});
let user: any = null;
try {
  user = JSON.parse(localStorage.getItem("whatsapp-user") ?? "");
} catch (error) {}
const initialState = {
  count: 0,
  user,
  noTabs: true,
  chattingWith: {},
};
let reducer = (state: any, action: any) => {
  switch (action.type) {
    case "loadUser": {
      console.log("Mutation called");
      localStorage.setItem(
        "whatsapp-user",
        JSON.stringify(action.payload.user)
      );
      return { ...state, user: action.payload.user };
    }

    case "setNoTabs": {
      return { ...state, noTabs: action.payload };
    }

    case "setChattingWith": {
      return { ...state, chattingWith: action.payload };
    }

    default:
      return { ...state };
  }
};
const AppContextProvider = (props: any) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};
const AppContextConsumer = AppContext.Consumer;
export { AppContext, AppContextProvider, AppContextConsumer };
export default AppContext;
