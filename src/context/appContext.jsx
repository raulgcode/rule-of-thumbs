import React from "react";
import { appReducer, initialState } from "./reducer";
import {appActions} from './actions'
const AppContext = React.createContext(null);

export const AppContextProvider = ({children}) => {
  const [state, dispatch] = React.useReducer(appReducer, initialState)
  const {loadUsers, vote, resetVote} = appActions(dispatch)

  const value =  React.useMemo(()=>({
    state, 
    loadUsers,
    vote,
    resetVote,
  }), 
  [
    state,
    loadUsers, 
    vote,
    resetVote,
  ])

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => React.useContext(AppContext)