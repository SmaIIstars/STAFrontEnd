import React, { memo } from "react";

import { Wrapper } from "./style";

const LoginContainer = memo((props) => {
  const { children } = props;
  return <Wrapper>{children}</Wrapper>;
});

export default LoginContainer;
