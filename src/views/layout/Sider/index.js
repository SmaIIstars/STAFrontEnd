import React, { memo, useMemo, useState } from "react";
import { Menu, Layout } from "antd";
import { NavLink } from "react-router-dom";

import { SiderTitle } from "./style";
import { sider_routes, sider_icons } from "assets/local_data.js";

const Sider = memo((props) => {
  const { Item } = Menu;
  const { Sider } = Layout;
  const [collapsed, setCollapsed] = useState(false);
  const [authority, setAuthority] = useState(0);
  useMemo(() => setAuthority(localStorage.getItem("authority")), []);

  const onCollapse = (collapsed) => {
    setCollapsed(collapsed);
    props.getSiderCollapsed(collapsed);
  };

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={onCollapse}
      style={{
        height: "100vh",
        position: "fixed",
        left: 0,
      }}
    >
      <SiderTitle>STA</SiderTitle>

      <Menu theme="dark" defaultSelectedKeys={["0"]} mode="inline">
        {sider_routes
          .filter((item) => {
            return item.authority <= authority;
          })
          .map((item, index) => {
            return (
              <Item key={index} icon={sider_icons[index]}>
                <NavLink to={item.link}>{item.title}</NavLink>
              </Item>
            );
          })}
      </Menu>
    </Sider>
  );
});
export default Sider;
