import request from "./request";

export const loginRequest = (username, password) => {
  return request({
    method: "post",
    url: "api/data/login",
    data: {
      username,
      password,
    },
  });
};
