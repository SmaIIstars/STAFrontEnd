import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";

export const authority = {
  guest: 0,
  admin: 1,
  superAdmin: 2,
};

export const re_authority = {
  0: "游客",
  1: "管理员",
  2: "超级管理员",
};

export const tagColors = {
  0: {
    color: "#13c2c2",
    background: "#e6fffb",
    borderColor: "#87e8de",
  },
  1: {
    color: "#52c41a",
    background: "#f6ffed",
    borderColor: "#b7eb8f",
  },
  2: {
    color: "#f5222d",
    background: "#fff1f0",
    borderColor: "#ffa39e",
  },
};

// routes of Sider
export const sider_routes = [
  {
    title: "人员",
    link: "/personnel",
    authority: authority.guest,
  },
  {
    title: "项目",
    link: "/project",
    authority: authority.guest,
  },
  {
    title: "权限管理",
    link: "/authority",
    authority: authority.superAdmin,
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
  // personnel
  perid: "学号",
  name: "名字",
  degree: "学位",
  EB: "学历",
  title: "职称",

  // authority
  email: "邮箱",
  username: "用户名",
  authority: "权限",
  key: "关键词",
};

// User Info
export const user = {
  email: localStorage.getItem("email"),
  username: localStorage.getItem("username"),
  authority: parseInt(localStorage.getItem("authority")),
};
