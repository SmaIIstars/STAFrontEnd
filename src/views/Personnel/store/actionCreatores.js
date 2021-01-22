import { getPersonnelList } from "servers/personnel";

import { CHANGE_PERSONNEL_LIST } from "./constants";

// chageActions
const changePersonnelListAction = (res) => {
  return {
    type: CHANGE_PERSONNEL_LIST,
    personnelList: res,
  };
};

// getActions
export const getPersonnelListAction = () => {
  return (dispatch) => {
    getPersonnelList().then((res) => {
      const { data } = res;
      dispatch(changePersonnelListAction(data.data));
    });
  };
};
