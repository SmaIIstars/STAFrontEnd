import request from "./request";

export const getPersonnelList = () => {
  const token = localStorage.getItem("token");
  return request({
    method: "post",
    url: "api/data/personnel",
    data: {
      token: token,
    },
  });
};

export const filesUpload = (option) => {
  console.log(option);
  return request({});
};
