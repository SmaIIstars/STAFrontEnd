import styled from "styled-components";

export const MainLayout = styled.div`
  .layoutwrapper {
    min-height: 100vh;
  }

  .ant-layout-sider,
  .ant-layout-header {
    background-color: #434343;
  }

  .ant-layout-sider-trigger,
  .ant-menu.ant-menu-dark,
  .ant-menu-dark .ant-menu-sub,
  .ant-menu.ant-menu-dark .ant-menu-sub {
    background-color: #262626;
  }

  .ant-menu.ant-menu-dark .ant-menu-item-selected,
  .ant-menu-submenu-popup.ant-menu-dark .ant-menu-item-selected {
    background-color: #1f1f1f;
  }
`;
