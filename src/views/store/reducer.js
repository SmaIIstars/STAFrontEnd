import { Map } from "immutable";

import { CHANGE_LOADING_STATUS } from "./constants";

const defaultState = Map({
  loading: false,
});

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case CHANGE_LOADING_STATUS:
      // console.log(action.status);
      return state.set(("loading", action.status));
    // return { ...state, loading: action.status };

    default:
      return state;
  }
};

export default reducer;
