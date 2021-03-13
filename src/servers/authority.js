import request from "./request";
import { user } from "assets/local_data";

export const changeUserAuthority = (info) => {
  // console.log(info);
  return request({
    method: "POST",
    url: "api/authority/change",
    data: {
      user,
      info,
    },
  });
};
