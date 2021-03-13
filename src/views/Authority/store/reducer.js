import { Map } from "immutable";

import { GET_USER_LIST } from "./constants";

// There are some issues that can affect performance. I should have done a paged query, but I didn't want to do that. It's a serious problem.
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
