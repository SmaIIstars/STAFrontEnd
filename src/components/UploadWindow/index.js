import React, { memo } from "react";
import { Modal } from "antd";

import UploadArea from "common/UploadArea";

const UploadWindow = (props) => {
  const { isVisible = false, ok, cancel, title = "Basic" } = props;

  return (
    <Modal title={title} visible={isVisible} onOk={ok} onCancel={cancel}>
      <UploadArea />
    </Modal>
  );
};

export default memo(UploadWindow);
