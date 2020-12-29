import React, { memo } from "react";
import { Layout } from "antd";

import { HeaderTitle } from "./style";

const Header = memo((props) => {
  const { Header } = Layout;
  return (
    <Header className="site-layout-background" style={{ padding: "0 16px" }}>
      <HeaderTitle>System Of Techology Achievement</HeaderTitle>
    </Header>
  );
});

export default Header;
