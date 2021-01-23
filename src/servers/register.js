import request from "./request";

export const emailCaptcha = (data) => {
  return request({
    method: "POST",
    url: "api/data/captcha",
    data,
  });
};
