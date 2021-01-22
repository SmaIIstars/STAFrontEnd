import { Map } from "immutable";

import { CHANGE_PERSONNEL_LIST } from "./constants";

const defaultState = Map({
  personnelList: [],
});

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case CHANGE_PERSONNEL_LIST:
      return state.set("personnelList", action.personnelList);
    default:
      return state;
  }
};

export default reducer;
