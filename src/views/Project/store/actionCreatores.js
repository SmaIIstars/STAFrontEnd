import { getProjectList } from "servers/project";

import { CHANGE_PROJECT_LIST, CHANGE_TOTAL } from "./constants";

// chageActions
const changeProjectListAction = (res) => {
  return {
    type: CHANGE_PROJECT_LIST,
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
export const getProjectListAction = (type, currentPage, pageSize) => {
  return (dispatch) => {
    getProjectList(type, currentPage, pageSize).then((res) => {
      const { data } = res;

      dispatch(changeProjectListAction(data.data));
      dispatch(chageTotalAction(data.total));
    });
  };
};
