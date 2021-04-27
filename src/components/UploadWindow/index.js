import React, { memo, useRef, useEffect } from "react";
import { Modal } from "antd";

import UploadArea from "common/UploadArea";

const UploadWindow = (props) => {
  const { ModalProps, UploadProps } = props;
  const {
    isVisible = false,
    ok,
    cancel,
    title = "Basic",
    footer = null,
  } = ModalProps;

  const uploadAreaRef = useRef();

  useEffect(() => {
    if (uploadAreaRef.current) uploadAreaRef.current.fileList.length = 0;
  }, [isVisible]);

  return (
    <Modal
      title={title}
      visible={isVisible}
      onOk={ok}
      onCancel={cancel}
      footer={footer}
    >
      <UploadArea UploadProps={UploadProps} ref={uploadAreaRef} />
    </Modal>
  );
};

export default memo(UploadWindow);
