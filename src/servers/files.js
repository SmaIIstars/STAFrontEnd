import request from "./request";

export const filesUpload = (files) => {
  return request({
    url: "api/files/upload/add",
    method: "POST",
    headers: {
      ContentType: "multipart/form-data",
    },
    data: files,
  });
};

export const filesDownload = (fileName) => {
  return request({
    url: "api/files/download",
    params: {
      fileName,
    },
    responseType: "blob",
  });
};
