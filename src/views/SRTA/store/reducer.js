import { Map } from "immutable";

import { CHANGE_SRTA_LIST, CHANGE_TOTAL } from "./constants";

const defaultState = Map({
  srtaList: [],
  total: 0,
});

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case CHANGE_SRTA_LIST:
      return state.set("srtaList", action.srtaList);
    case CHANGE_TOTAL:
      return state.set("total", action.total);
    default:
      return state;
  }
};

export default reducer;
