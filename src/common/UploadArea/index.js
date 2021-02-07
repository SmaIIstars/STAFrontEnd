import React, { memo } from "react";
import { Upload, message } from "antd";
import { InboxOutlined } from "@ant-design/icons";

const { Dragger } = Upload;

const UploadArea = (props) => {
  const { UploadProps = {}, TipText = ".xlsx" } = props;
  const {
    name = "file",
    multiple = false,
    showUploadList = true,
    accept,

    action = "api/files/upload",
    method,
    headers = {
      ContentType: "multipart/form-data",
    },

    onChange = (info) => {
      const { status } = info.file;
      if (status !== "uploading") {
        console.log(status, info.fileList);
      }
      if (status === "done") {
        message.success(`${info.file.name} 文件上传成功!`);
      } else if (status === "error") {
        message.error(`${info.file.name} 文件上传失败!`);
      }
    },

    beforeUpload = (file, fileList) => {
      return new Promise((resolve, reject) => {
        // console.log(file);
        if (
          file.type !==
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        ) {
          message.error({
            content: "上传文件格式错误!",
          });
        } else {
          resolve(true);
        }
        reject(false);
      });
    },
  } = UploadProps;

  const uploadprops = {
    name,
    multiple,
    showUploadList,
    accept,

    action,
    method,
    headers,

    beforeUpload,
    onChange,
    transformFile: (file) => file,
  };

  return (
    <Dragger {...uploadprops}>
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">单击或拖动文件到此区域进行上传</p>
      <p className="ant-upload-text">{TipText}</p>
    </Dragger>
  );
};

export default memo(UploadArea);
