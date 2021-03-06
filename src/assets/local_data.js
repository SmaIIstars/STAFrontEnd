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
    authority: 0,
  },
  {
    title: "项目",
    link: "/project",
    authority: 0,
  },
  {
    title: "权限管理",
    link: "/authority",
    authority: 2,
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

// Chinese-English
export const transformWords = {
  //
  id: "ID",
  name: "名字",
  degree: "学位",
  EB: "学历",
  title: "职称",
};
