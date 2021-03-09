import React, { memo, useEffect } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";

import { Button, Space, Tag } from "antd";

import { getUserListAction } from "./store/actionCreatores";
import Container from "common/Container";
import SearchTable from "common/SearchTable";
import {
  ContainerWrapper,
  TitleWrapper,
  SearchTableWrapper,
  DropDownWrapper,
} from "./style";

const columns = [
  {
    title: "#",
    dataIndex: "index",
    align: "center",
    isSearch: false,
    render: (text, record, index) => `${index + 1}`,
  },
  {
    title: "用户名",
    dataIndex: "username",
    align: "center",
  },
  {
    title: "邮箱",
    dataIndex: "email",
    align: "center",
  },
  {
    title: "权限",
    dataIndex: "authority",
    isSearch: false,
    align: "center",
    render: (text, record, index) => authorityTags[text],
  },
];

const authorityTags = {
  0: <Tag color="cyan">游客</Tag>,
  1: <Tag color="green">管理员</Tag>,
  2: <Tag color="red">超级管理员</Tag>,
};

const Authority = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserListAction());
  }, [dispatch]);

  const { userList } = useSelector(
    (state) => ({
      userList: state.getIn(["authority", "userList"]),
    }),
    shallowEqual
  );

  const getDataSource = (dataSource) =>
    dataSource
      ? dataSource.map((item) => {
          return Object.assign(item, { key: item.email });
        })
      : null;

  // JSX
  const HeaderObj = {
    leftHeader: <TitleWrapper>权限管理</TitleWrapper>,
    // midHeader: <div>mid</div>,
    rightHeader: (
      <DropDownWrapper>
        <Space>
          <Button onClick={(e) => e.preventDefault()}>新增数据</Button>
        </Space>
      </DropDownWrapper>
    ),
  };

  return (
    <Container isHeader={true} Header={{ ...HeaderObj }}>
      <ContainerWrapper>
        <SearchTableWrapper>
          <SearchTable
            columns={columns}
            dataSource={getDataSource(userList)}
            bordered={true}
          />
        </SearchTableWrapper>
      </ContainerWrapper>
    </Container>
  );
};

export default memo(Authority);
