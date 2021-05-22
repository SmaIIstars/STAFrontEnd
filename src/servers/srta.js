import request from "./request";
import { user } from "assets/local_data";

export const getSRTAList = (type, currentPage = 1, pageSize = 5) => {
  const token = localStorage.getItem("token");
  if (type === "all") {
    return request({
      url: "api/srta/getlist",
      params: { type, token },
    });
  } else {
    return request({
      url: "api/srta/getlist",
      params: {
        type,
        currentPage,
        pageSize,
        token,
      },
    });
  }
};

export const changeSRTAInfo = (info) => {
  // console.log(user, info);
  return request({
    method: "post",
    url: "api/srta/change",
    data: {
      user,
      info,
    },
  });
};

export const deleteSRTA = (info) => {
  return request({
    method: "post",
    url: "api/srta/delete",
    data: {
      user,
      info,
    },
  });
};

export const addSRTA = (info) => {
  return request({
    method: "post",
    url: "api/srta/add",
    data: {
      user,
      info,
    },
  });
};
