import { Map } from "immutable";

import { CHANGE_MEETING_LIST, CHANGE_TOTAL } from "./constants";

const defaultState = Map({
  meetingList: [],
  total: 0,
});

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case CHANGE_MEETING_LIST:
      return state.set("meetingList", action.meetingList);
    case CHANGE_TOTAL:
      return state.set("total", action.total);
    default:
      return state;
  }
};

export default reducer;
