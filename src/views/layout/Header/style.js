import styled from "styled-components";

export const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  .header-title,
  .username {
    color: white;
    font-size: 24px;
  }

  .username {
    margin-right: 24px;
    cursor: default;
  }
`;
