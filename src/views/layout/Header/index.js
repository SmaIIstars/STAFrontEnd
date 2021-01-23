import React, { memo, useState, useEffect } from "react";
import { Layout } from "antd";

import UserDropdown from "./cpns/UserDropdown";
import { HeaderWrapper } from "./style";

const Header = memo((props) => {
  const { Header } = Layout;
  const [userInfo, setUserInfo] = useState({});
  useEffect(() => {
    let username = localStorage.getItem("username");
    let authority = localStorage.getItem("authority");
    setUserInfo({ username, authority });
  }, []);

  return (
    <Header className="site-layout-background" style={{ padding: "0 16px" }}>
      <HeaderWrapper>
        <div className="header-title">System Of Techology Achievement</div>
        <div className="username">
          <UserDropdown userInfo={userInfo} />
        </div>
      </HeaderWrapper>
    </Header>
  );
});

export default Header;
