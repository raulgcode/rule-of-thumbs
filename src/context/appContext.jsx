import React from "react";
import { appReducer, initialState } from "./reducer";
import {appActions} from './actions'
const AppContext = React.createContext(null);

export const AppContextProvider = ({children}) => {
  const [state, dispatch] = React.useReducer(appReducer, initialState)
  const {loadUsers, vote, resetVote, changeView} = appActions(dispatch)

  const value =  React.useMemo(()=>({
    state, 
    loadUsers,
    vote,
    resetVote,
    changeView,
  }), 
  [state, loadUsers, vote, resetVote, changeView])

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => React.useContext(AppContext)
