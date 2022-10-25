export const LOAD_USERS = "LOAD_USERS";

export const initialState = {
  users: [],
};

export const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_USERS:
      return { ...state, users: action.payload.users };
    default:
      return state;
  }
};
