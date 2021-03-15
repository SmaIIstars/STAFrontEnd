import styled from "styled-components";

export const ContainerWrapper = styled.div`
  background-color: #fff;
  height: 100%;
  margin: 20px;
`;

export const SearchTableWrapper = styled.div`
  padding: 20px;

  .ant-table-filter-column-title {
    padding: 16px;
  }
`;

export const TitleWrapper = styled.div`
  font-size: 18px;
  font-weight: 600;
  padding: 0 16px;
`;

export const DropDownWrapper = styled.div`
  margin-right: 20px;
`;

export const ListItemWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  align-items: center;
`;

export const TagsWrapper = styled.span`
  text-align: center;

  .ant-select-selector {
    /* background: red; */
    background: ${(props) => props.background} !important;
    border-color: ${(props) => props.borderColor} !important;
  }
`;
