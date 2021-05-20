import { getPaperList } from "servers/paper";

import { CHANGE_PAPER_LIST, CHANGE_TOTAL } from "./constants";

// chageActions
const changeProjectListAction = (res) => {
  return {
    type: CHANGE_PAPER_LIST,
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
export const getPaperListAction = (type, currentPage, pageSize) => {
  return (dispatch) => {
    getPaperList(type, currentPage, pageSize).then((res) => {
      const { data } = res;

      dispatch(changePaperListAction(data.data));
      dispatch(chageTotalAction(data.total));
    });
  };
};
