import { getUserList } from "servers/user";

import { GET_USER_LIST } from "./constants";

// changeActions
const changeUserListAction = (res) => {
  return {
    type: GET_USER_LIST,
    userList: res.users,
  };
};

// getActions
export const getUserListAction = () => {
  return (dispatch) => {
    getUserList().then((res) => {
      const { data } = res;
      dispatch(changeUserListAction(data));
    });
  };
};
