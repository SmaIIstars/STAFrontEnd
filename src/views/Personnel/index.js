import React, { memo } from "react";

import Container from "../../common/Container";

const Personnel = memo((props) => {
  return (
    <Container
      isHeader={true}
      Header={{
        leftHeader: <div>left</div>,
        midHeader: <div>mid</div>,
        rightHeader: <div>right</div>,
      }}
    ></Container>
  );
});

export default Personnel;
