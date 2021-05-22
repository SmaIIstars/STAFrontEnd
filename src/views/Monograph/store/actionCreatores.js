import { getMonographList } from "servers/monograph";

import { CHANGE_MONOGRAPH_LIST, CHANGE_TOTAL } from "./constants";

// chageActions
const changeMonographListAction = (res) => {
  return {
    type: CHANGE_MONOGRAPH_LIST,
    monographList: res,
  };
};

const chageTotalAction = (res) => {
  return {
    type: CHANGE_TOTAL,
    total: res,
  };
};

// getActions
export const getMonographListAction = (type, currentPage, pageSize) => {
  return (dispatch) => {
    getMonographList(type, currentPage, pageSize).then((res) => {
      const { data } = res;

      dispatch(changeMonographListAction(data.data));
      dispatch(chageTotalAction(data.total));
    });
  };
};
