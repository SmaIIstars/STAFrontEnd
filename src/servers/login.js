import request from "./request";

export const loginRequest = (email, password) => {
  return request({
    method: "post",
    url: "api/login",
    data: {
      email,
      password,
    },
  });
};
