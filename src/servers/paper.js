import request from "./request";
import { user } from "assets/local_data";

export const getPaperList = (type, currentPage = 1, pageSize = 5) => {
  const token = localStorage.getItem("token");
  if (type === "all") {
    return request({
      url: "api/paper/getlist",
      params: { type, token },
    });
  } else {
    return request({
      url: "api/paper/getlist",
      params: {
        type,
        currentPage,
        pageSize,
        token,
      },
    });
  }
};

export const changePaperInfo = (info) => {
  // console.log(user, info);
  return request({
    method: "post",
    url: "api/paper/change",
    data: {
      user,
      info,
    },
  });
};

export const deletePaper = (info) => {
  return request({
    method: "post",
    url: "api/paper/delete",
    data: {
      user,
      info,
    },
  });
};

export const addPaper = (info) => {
  return request({
    method: "post",
    url: "api/paper/add",
    data: {
      user,
      info,
    },
  });
};
