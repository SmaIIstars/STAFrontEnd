import request from "./request";
import { user } from "assets/local_data";

export const getPersonnelList = (type, currentPage = 1, pageSize = 5) => {
  const token = localStorage.getItem("token");
  if (type === "all") {
    return request({
      url: "api/personnel/getlist",
      params: { type, token },
    });
  } else {
    return request({
      url: "api/personnel/getlist",
      params: {
        type,
        currentPage,
        pageSize,
        token,
      },
    });
  }
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
