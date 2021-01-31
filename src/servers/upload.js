import request from "./request";

export const filesUpload = (files) => {
  return request({
    url: "api/files/upload",
    method: "POST",
    headers: {
      ContentType: "multipart/form-data",
    },
    data: files,
  });
};
