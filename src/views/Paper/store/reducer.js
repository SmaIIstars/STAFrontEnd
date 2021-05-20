import { Map } from "immutable";

import { CHANGE_PAPER_LIST, CHANGE_TOTAL } from "./constants";

const defaultState = Map({
  paperList: [],
  total: 0,
});

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case CHANGE_PAPER_LIST:
      return state.set("paperList", action.paperList);
    case CHANGE_TOTAL:
      return state.set("total", action.total);
    default:
      return state;
  }
};

export default reducer;
