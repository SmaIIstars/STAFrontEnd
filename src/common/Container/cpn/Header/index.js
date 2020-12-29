import React, { memo } from "react";

import { HeaderWrapper } from "./style";

const Header = memo((props) => {
  const { leftHeader, midHeader, rightHeader } = props;

  return (
    <HeaderWrapper>
      {leftHeader ? <div className="left-header">{leftHeader}</div> : null}
      {midHeader ? <div className="mid-header">{midHeader}</div> : null}
      {rightHeader ? <div className="right-header">{rightHeader}</div> : null}
    </HeaderWrapper>
  );
});

export default Header;
