import { getSRTAList } from "servers/srta";

import { CHANGE_SRTA_LIST, CHANGE_TOTAL } from "./constants";

// chageActions
const changeSRTAListAction = (res) => {
  return {
    type: CHANGE_SRTA_LIST,
    srtaList: res,
  };
};

const chageTotalAction = (res) => {
  return {
    type: CHANGE_TOTAL,
    total: res,
  };
};

// getActions
export const getSRTAListAction = (type, currentPage, pageSize) => {
  return (dispatch) => {
    getSRTAList(type, currentPage, pageSize).then((res) => {
      const { data } = res;

      dispatch(changeSRTAListAction(data.data));
      dispatch(chageTotalAction(data.total));
    });
  };
};
