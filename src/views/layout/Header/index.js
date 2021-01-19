import React, { memo } from "react";
import { Layout } from "antd";

import { HeaderWrapper } from "./style";

const Header = memo((props) => {
  const { Header } = Layout;
  return (
    <Header className="site-layout-background" style={{ padding: "0 16px" }}>
      <HeaderWrapper>
        <div className="header-title">System Of Techology Achievement</div>
        <div className="username"></div>
      </HeaderWrapper>
    </Header>
  );
});

export default Header;
