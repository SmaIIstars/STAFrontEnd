import request from "./request";

export const emailCaptcha = (data) => {
  return request({
    method: "POST",
    url: "api/captcha",
    data,
  });
};

export const registerUser = (data) => {
  return request({
    method: "POST",
    url: "api/register",
    data,
  });
};
