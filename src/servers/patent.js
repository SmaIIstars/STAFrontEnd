import request from "./request";
import { user } from "assets/local_data";

export const getPatentList = (type, currentPage = 1, pageSize = 5) => {
  const token = localStorage.getItem("token");
  if (type === "all") {
    return request({
      url: "api/patent/getlist",
      params: { type, token },
    });
  } else {
    return request({
      url: "api/patent/getlist",
      params: {
        type,
        currentPage,
        pageSize,
        token,
      },
    });
  }
};

export const changePatentInfo = (info) => {
  // console.log(user, info);
  return request({
    method: "post",
    url: "api/patent/change",
    data: {
      user,
      info,
    },
  });
};

export const deletePatent = (info) => {
  return request({
    method: "post",
    url: "api/patent/delete",
    data: {
      user,
      info,
    },
  });
};

export const addPatent = (info) => {
  return request({
    method: "post",
    url: "api/patent/add",
    data: {
      user,
      info,
    },
  });
};
