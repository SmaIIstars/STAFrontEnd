import React, { memo } from "react";

import { ContainerWrapper } from "./style";
import CHeader from "./cpn/Header";

const Container = memo((props) => {
  const { isHeader, Header, children } = props;
  const { leftHeader, midHeader, rightHeader } = Header;

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
