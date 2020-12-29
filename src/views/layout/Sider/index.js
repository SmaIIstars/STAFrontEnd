import React, { memo, useState } from "react";
import { Menu, Layout } from "antd";
import { NavLink } from "react-router-dom";

import { SiderTitle } from "./style";
import { sider_routes, sider_icons } from "assets/local_data.js";

const Sider = memo((props) => {
  const { Item } = Menu;
  const [collapsed, setCollapsed] = useState(false);
  const { Sider } = Layout;

  const onCollapse = (collapsed) => {
    setCollapsed(collapsed);
  };

  return (
    <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
      <SiderTitle>STA</SiderTitle>

      <Menu theme="dark" defaultSelectedKeys={["0"]} mode="inline">
        {sider_routes.map((item, index) => {
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
