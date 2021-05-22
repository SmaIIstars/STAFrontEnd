import { Map } from "immutable";

import { CHANGE_PATENT_LIST, CHANGE_TOTAL } from "./constants";

const defaultState = Map({
  patentList: [],
  total: 0,
});

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case CHANGE_PATENT_LIST:
      return state.set("patentList", action.patentList);
    case CHANGE_TOTAL:
      return state.set("total", action.total);
    default:
      return state;
  }
};

export default reducer;
