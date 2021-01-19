import request from "./request";

export const getPersonnelList = () => {
  return request({
    method: "get",
    url: "api/data/personnel",
  });
};
