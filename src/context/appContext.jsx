import React from "react";
import { appReducer, initialState } from "./reducer";

const AppContext = React.createContext(null);

export const AppContextProvider = ({children}) => {
  const [state, dispatch] = React.useReducer(appReducer, initialState)

 const value =  React.useMemo(()=>({state, dispatch}), [state, dispatch])

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => React.useContext(AppContext)