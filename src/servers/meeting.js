import request from "./request";
import { user } from "assets/local_data";

export const getMeetingList = (type, currentPage = 1, pageSize = 5) => {
  const token = localStorage.getItem("token");
  if (type === "all") {
    return request({
      url: "api/meeting/getlist",
      params: { type, token },
    });
  } else {
    return request({
      url: "api/meeting/getlist",
      params: {
        type,
        currentPage,
        pageSize,
        token,
      },
    });
  }
};

export const changeMeetingInfo = (info) => {
  // console.log(user, info);
  return request({
    method: "post",
    url: "api/meeting/change",
    data: {
      user,
      info,
    },
  });
};

export const deleteMeeting = (info) => {
  return request({
    method: "post",
    url: "api/meeting/delete",
    data: {
      user,
      info,
    },
  });
};

export const addMeeting = (info) => {
  return request({
    method: "post",
    url: "api/meeting/add",
    data: {
      user,
      info,
    },
  });
};
