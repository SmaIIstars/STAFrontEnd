import request from "./request";
const token = localStorage.getItem("token");
console.log(token);

export const getPersonnelList = () => {
  return request({
    method: "post",
    url: "api/data/personnel",
    data: {
      token: token,
    },
  });
};
