import { Map } from "immutable";

import { CHANGE_PROJECT_LIST, CHANGE_TOTAL } from "./constants";

const defaultState = Map({
  projectList: [],
  total: 0,
});

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case CHANGE_PROJECT_LIST:
      return state.set("projectList", action.projectList);
    case CHANGE_TOTAL:
      return state.set("total", action.total);
    default:
      return state;
  }
};

export default reducer;
