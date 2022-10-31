export const LOAD_USERS = "LOAD_USERS";
export const DO_VOTE = "DO_VOTE";
export const RESET_VOTE = "RESET_VOTE";
export const CHANGE_VIEW = "CHANGE_VIEW";

export const initialState = {
  users: [],
  votedUsers: new Set(),
  view: "grid",
};

export const appReducer = (state, action) => {
  switch (action.type) {
    case LOAD_USERS:
      return { ...state, users: action.payload.users };
    case DO_VOTE: {
      const user = state.users.find(({ id }) => id === action.payload.user.id);
      user.votes = action.payload.user.votes;
      state.votedUsers.add(user.id);
      return { ...state };
    }
    case RESET_VOTE: {
      state.votedUsers.delete(action.payload.user.id);
      return { ...state };
    }
    case CHANGE_VIEW:
      return { ...state, view: action.payload.view };
    default:
      return state;
  }
};
