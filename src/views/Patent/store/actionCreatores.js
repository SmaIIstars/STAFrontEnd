import { getPatentList } from "servers/patent";

import { CHANGE_PATENT_LIST, CHANGE_TOTAL } from "./constants";

// chageActions
const changePatentListAction = (res) => {
  return {
    type: CHANGE_PATENT_LIST,
    patentList: res,
  };
};

const chageTotalAction = (res) => {
  return {
    type: CHANGE_TOTAL,
    total: res,
  };
};

// getActions
export const getPatentListAction = (type, currentPage, pageSize) => {
  return (dispatch) => {
    getPatentList(type, currentPage, pageSize).then((res) => {
      const { data } = res;

      dispatch(changePatentListAction(data.data));
      dispatch(chageTotalAction(data.total));
    });
  };
};
