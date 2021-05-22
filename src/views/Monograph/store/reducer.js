import { Map } from "immutable";

import { CHANGE_MONOGRAPH_LIST, CHANGE_TOTAL } from "./constants";

const defaultState = Map({
  monographList: [],
  total: 0,
});

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case CHANGE_MONOGRAPH_LIST:
      return state.set("monographList", action.monographList);
    case CHANGE_TOTAL:
      return state.set("total", action.total);
    default:
      return state;
  }
};

export default reducer;
