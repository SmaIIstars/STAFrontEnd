import { Map } from "immutable";

import { GET_USER_LIST } from "./constants";

const defaultState = Map({
  userList: [],
});

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case GET_USER_LIST:
      return state.set("userList", action.userList);

    default:
      return state;
  }
};

export default reducer;
