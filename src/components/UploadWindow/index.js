import React, { memo } from "react";
import { Modal } from "antd";

import UploadArea from "common/UploadArea";

const UploadWindow = (props) => {
  const { ModalProps, UploadProps } = props;
  const { isVisible = false, ok, cancel, title = "Basic" } = ModalProps;

  return (
    <Modal title={title} visible={isVisible} onOk={ok} onCancel={cancel}>
      <UploadArea UploadProps={UploadProps} />
    </Modal>
  );
};

export default memo(UploadWindow);
