import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";

// routes of Sider
export const sider_routes = [
  {
    title: "人员",
    link: "/personnel",
  },
  {
    title: "项目",
    link: "/project",
  },
];

export const sider_icons = [
  <UserOutlined />,
  <DesktopOutlined />,
  <FileOutlined />,
  <PieChartOutlined />,
  <TeamOutlined />,
];

// UserDropdown
export const layout_header_dropdown_items = [
  {
    key: "userinfo",
    title: "基本信息",
    href: "/personnel",
  },
  {
    key: "signout",
    title: "注销",
    href: "/login",
  },
];
