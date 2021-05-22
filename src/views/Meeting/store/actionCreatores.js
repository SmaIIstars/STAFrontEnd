import { getMeetingList } from "servers/meeting";

import { CHANGE_MEETING_LIST, CHANGE_TOTAL } from "./constants";

// chageActions
const changeMeetingListAction = (res) => {
  return {
    type: CHANGE_MEETING_LIST,
    meetingList: res,
  };
};

const chageTotalAction = (res) => {
  return {
    type: CHANGE_TOTAL,
    total: res,
  };
};

// getActions
export const getMeetingListAction = (type, currentPage, pageSize) => {
  return (dispatch) => {
    getMeetingList(type, currentPage, pageSize).then((res) => {
      const { data } = res;

      dispatch(changeMeetingListAction(data.data));
      dispatch(chageTotalAction(data.total));
    });
  };
};
