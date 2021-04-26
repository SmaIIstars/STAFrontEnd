import { Map } from "immutable";

import { CHANGE_PERSONNEL_LIST, CHANGE_TOTAL } from "./constants";

const defaultState = Map({
  personnelList: [],
  total: 0,
});

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case CHANGE_PERSONNEL_LIST:
      return state.set("personnelList", action.personnelList);
    case CHANGE_TOTAL:
      return state.set("total", action.total);
    default:
      return state;
  }
};

export default reducer;
