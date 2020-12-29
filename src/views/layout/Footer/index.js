import React, { memo } from "react";
import { Layout } from "antd";

const Footer = memo((props) => {
  const { Footer } = Layout;
  return (
    <Footer style={{ textAlign: "center" }}>
      STA ©2020 Created by Small Stars
    </Footer>
  );
});

export default Footer;
