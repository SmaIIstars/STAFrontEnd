import request from "./request";

// getUserList and getUser can be marged into a function, it's not a serious problem.
export const getUserList = () => {
  return request({
    method: "GET",
    url: "api/user/getlist",
  });
};

export const getUser = (query) => {
  // console.log(query);
  return request({
    method: "GET",
    url: "api/user/getuser",
    params: {
      ...query,
    },
  });
};
