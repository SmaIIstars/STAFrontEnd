import { getPersonnelList } from "servers/personnel";

import { CHANGE_PERSONNEL_LIST, CHANGE_TOTAL } from "./constants";

// chageActions
const changePersonnelListAction = (res) => {
  return {
    type: CHANGE_PERSONNEL_LIST,
    personnelList: res,
  };
};

const chageTotalAction = (res) => {
  return {
    type: CHANGE_TOTAL,
    total: res,
  };
};

// getActions
export const getPersonnelListAction = (type, currentPage, pageSize) => {
  return (dispatch) => {
    getPersonnelList(type, currentPage, pageSize).then((res) => {
      const { data } = res;

      dispatch(changePersonnelListAction(data.data));
      dispatch(chageTotalAction(data.total));
    });
  };
};
