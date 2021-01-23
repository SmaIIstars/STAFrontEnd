import React, { memo } from "react";
import { Layout } from "antd";

import { CopyRight } from "./style";

const Footer = memo((props) => {
  const { Footer } = Layout;
  return (
    <Footer>
      <CopyRight>
        <span>STA ©2020 Created by Small Stars</span>
      </CopyRight>
    </Footer>
  );
});

export default Footer;
