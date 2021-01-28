import React, { memo } from "react";
import { useLocation } from "react-router";

import { sider_routes } from "@/assets/local_data.js";

import CHeader from "./cpn/Header";
import { ContainerWrapper } from "./style";

const Container = memo((props) => {
  const location = useLocation();
  const title = sider_routes.filter(
    (item) => item.link === location.pathname
  )[0].title;

  const { isHeader, Header, children } = props;
  if (isHeader) {
    var { leftHeader = title, midHeader = null, rightHeader = null } = Header;
  }

  return (
    <ContainerWrapper>
      {isHeader ? (
        <CHeader
          leftHeader={leftHeader}
          midHeader={midHeader}
          rightHeader={rightHeader}
        />
      ) : null}
      {children}
    </ContainerWrapper>
  );
});

export default Container;
