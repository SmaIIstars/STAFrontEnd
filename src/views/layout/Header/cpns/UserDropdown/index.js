import React, { memo, useState, useEffect } from "react";
import { Menu, Dropdown } from "antd";
import { NavLink } from "react-router-dom";

import { layout_header_dropdown_items as dropdownList } from "@/assets/local_data";
import { DropdownWrapper } from "./styled";

const UserDropdown = memo((props) => {
  const { userInfo } = props;
  const { username } = userInfo;

  const [menu, setMenu] = useState();
  useEffect(() => {
    setMenu(
      <Menu>
        {dropdownList.map((item) => {
          if (item.title === "注销") {
            <Menu.Divider />;
          }
          return (
            <Menu.Item key={item.key}>
              <NavLink to={item.href} onClick={clearLocalStroage}>
                {item.title}
              </NavLink>
            </Menu.Item>
          );
        })}
      </Menu>
    );
  }, []);

  const clearLocalStroage = () => {
    localStorage.clear();
  };

  return (
    <DropdownWrapper>
      <Dropdown overlay={menu} trigger={["click"]}>
        <a
          href="#/"
          className="ant-dropdown-link"
          onClick={(e) => e.preventDefault()}
        >
          {username}
        </a>
      </Dropdown>
    </DropdownWrapper>
  );
});

export default UserDropdown;
