import React, { memo } from "react";
import { Upload, message } from "antd";
import { InboxOutlined } from "@ant-design/icons";

const { Dragger } = Upload;

const UploadArea = (props) => {
  const { multiple = false } = props;

  const uploadprops = {
    name: "file",
    accept: ".xls, .xlsx",
    customRequest: (option) => {
      console.log(option);
    },
    beforeUpload: (file, fileList) => {
      return new Promise((resolve, reject) => {
        console.log(file);
        if (
          file.type !==
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        ) {
          message.error({
            content: "上传文件格式错误!",
          });
          reject(false);
        }
        resolve(true);
      });
    },
    multiple,
    transformFile: () => {},

    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        console.log(info.fileList);
      }
      if (status === "done") {
        message.success(`${info.file.name} 文件上传成功!`);
      } else if (status === "error") {
        message.error(`${info.file.name} 文件上传失败!`);
      }
    },
  };

  return (
    <Dragger {...uploadprops}>
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">单击或拖动文件到此区域进行上传</p>
      <p className="ant-upload-text">(.xls 或者 .xlsx)</p>
    </Dragger>
  );
};

export default memo(UploadArea);
