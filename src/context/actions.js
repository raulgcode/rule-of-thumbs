import { LOAD_USERS, DO_VOTE, RESET_VOTE, CHANGE_VIEW } from "./reducer";
import { updateVote } from "../services/users.service";

export const appActions = (dispatch) => ({
  loadUsers: (users) => {
    dispatch({ type: LOAD_USERS, payload: { users } });
  },
  vote: (user) => {
    (async () => {
      await updateVote(user);
    })();
    dispatch({ type: DO_VOTE, payload: { user } });
  },
  resetVote: (user) => {
    dispatch({ type: RESET_VOTE, payload: { user } });
  },
  changeView: (view) => {
    dispatch({ type: CHANGE_VIEW, payload: { view } });
  },
});
