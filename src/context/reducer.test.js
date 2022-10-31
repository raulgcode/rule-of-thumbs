import { appReducer } from "./reducer";

describe("reducer", () => {
  it("should return default state object", () => {
    const ANY_ACTION_TYPE = "ANY_ACTION_TYPE";
    const defaultState = {
      users: [],
      votedUsers: new Set(),
      view: "grid",
    };
    const state = appReducer(defaultState, { type: ANY_ACTION_TYPE });
    expect(state).toMatchSnapshot();
  });
});
