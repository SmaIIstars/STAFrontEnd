import React, { memo } from "react";

import Container from "common/Container";
import SearchTable from "common/SearchTable";
import { ContainerWrapper } from "./style";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    width: "30%",
    align: "center",
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age",
    width: "20%",
    align: "center",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
    align: "center",
  },
];

const dataSource = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
  },
  {
    key: "2",
    name: "Joe Black",
    age: 42,
    address: "London No. 1 Lake Park",
  },
  {
    key: "3",
    name: "Jim Green",
    age: 32,
    address: "Sidney No. 1 Lake Park",
  },
  {
    key: "4",
    name: "Jim Red",
    age: 32,
    address: "London No. 2 Lake Park",
  },
  {
    key: "5",
    name: "Jim Red",
    age: 32,
    address: "London No. 2 Lake Park",
  },
  {
    key: "6",
    name: "Jim Red",
    age: 32,
    address: "London No. 2 Lake Park",
  },
  {
    key: "7",
    name: "Jim Red",
    age: 32,
    address: "London No. 2 Lake Park",
  },
];

const Personnel = memo((props) => {
  return (
    <Container
      isHeader={true}
      Header={{
        leftHeader: <div>left</div>,
        midHeader: <div>mid</div>,
        rightHeader: <div>right</div>,
      }}
    >
      <ContainerWrapper>
        <SearchTable
          columns={columns}
          dataSource={dataSource}
          bordered={true}
        />
      </ContainerWrapper>
    </Container>
  );
});

export default Personnel;
