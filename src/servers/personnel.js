import request from "./request";
import { user } from "assets/local_data";

export const getPersonnelList = () => {
  const token = localStorage.getItem("token");
  return request({
    method: "post",
    url: "api/personnel/getlist",
    data: {
      token: token,
    },
  });
};

export const changePersonnelInfo = (info) => {
  // console.log(user, info);
  return request({
    method: "post",
    url: "api/personnel/change",
    data: {
      user,
      info,
    },
  });
};

export const deletePersonnel = (info) => {
  return request({
    method: "post",
    url: "api/personnel/delete",
    data: {
      user,
      info,
    },
  });
};

export const addPersonnel = (info) => {
  return request({
    method: "post",
    url: "api/personnel/add",
    data: {
      user,
      info,
    },
  });
};
