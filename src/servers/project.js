import request from "./request";
import { user } from "assets/local_data";

export const getProjectList = (type, currentPage = 1, pageSize = 5) => {
  const token = localStorage.getItem("token");
  if (type === "all") {
    return request({
      url: "api/project/getlist",
      params: { type, token },
    });
  } else {
    return request({
      url: "api/project/getlist",
      params: {
        type,
        currentPage,
        pageSize,
        token,
      },
    });
  }
};

export const changeProjectInfo = (info) => {
  // console.log(user, info);
  return request({
    method: "post",
    url: "api/project/change",
    data: {
      user,
      info,
    },
  });
};

export const deleteProject = (info) => {
  return request({
    method: "post",
    url: "api/project/delete",
    data: {
      user,
      info,
    },
  });
};

export const addProject = (info) => {
  return request({
    method: "post",
    url: "api/project/add",
    data: {
      user,
      info,
    },
  });
};
