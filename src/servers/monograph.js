import request from "./request";
import { user } from "assets/local_data";

export const getMonographList = (type, currentPage = 1, pageSize = 5) => {
  const token = localStorage.getItem("token");
  if (type === "all") {
    return request({
      url: "api/monograph/getlist",
      params: { type, token },
    });
  } else {
    return request({
      url: "api/monograph/getlist",
      params: {
        type,
        currentPage,
        pageSize,
        token,
      },
    });
  }
};

export const changeMonographInfo = (info) => {
  // console.log(user, info);
  return request({
    method: "post",
    url: "api/monograph/change",
    data: {
      user,
      info,
    },
  });
};

export const deleteMonograph = (info) => {
  return request({
    method: "post",
    url: "api/monograph/delete",
    data: {
      user,
      info,
    },
  });
};

export const addMonograph = (info) => {
  return request({
    method: "post",
    url: "api/monograph/add",
    data: {
      user,
      info,
    },
  });
};
