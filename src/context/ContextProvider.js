"use client";

import React, { createContext, useReducer } from "react";
import { commonReducer } from "./reducers/commonReducer";
import { COMMON_INITIAL_STATE } from "./initialStates/commonState";

export const AppContext = createContext();

const ContextProvider = ({ children }) => {
  const [commonDetails, commonDispatch] = useReducer(
    commonReducer,
    COMMON_INITIAL_STATE
  );

  //Combine dispatches
  const dispatch = (actions) => {
    commonDispatch(actions);
  };

  return (
    <AppContext.Provider
      value={{
        dispatch,
        commonDetails
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default ContextProvider;
