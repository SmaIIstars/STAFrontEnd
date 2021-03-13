import React, { memo, useEffect, useState } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";

import {
  Button,
  Space,
  Tag,
  Modal,
  Form,
  Select,
  message,
  Input,
  Table,
} from "antd";
import { EditOutlined } from "@ant-design/icons";

import { getUserListAction } from "./store/actionCreatores";
import Container from "common/Container";
import SearchTable from "common/SearchTable";
import {
  ContainerWrapper,
  TitleWrapper,
  SearchTableWrapper,
  DropDownWrapper,
} from "./style";

import { changeUserAuthority } from "servers/authority";
import { getUser } from "servers/user";
import { transformWords, authority, re_authority } from "assets/local_data";

const { Option } = Select;

const authorityTags = {
  0: <Tag color="cyan">游客</Tag>,
  1: <Tag color="green">管理员</Tag>,
  2: <Tag color="red">超级管理员</Tag>,
};

const formLayout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    offset: 1,
    span: 14,
  },
};

const query_columns = [
  {
    title: "#",
    dataIndex: "index",
    align: "center",
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
    align: "center",
    render: (text, record, index) => authorityTags[text],
  },
];

const Authority = (props) => {
  const dispatch = useDispatch();
  const [isEditModal, setIsEditModal] = useState(false);
  const [isAddModal, setIsAddModal] = useState(false);
  const [rowData, setRowData] = useState({});

  const [queryEmail, setQueryEmail] = useState();
  const [queryUsers, setQueryUsers] = useState([]);

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
      sorter: (a, b) => a.authority - b.authority,
      sortDirections: ["descend"],
    },
    {
      title: "操作",
      key: "operation",
      isSearch: false,
      align: "center",
      render: (text, record, index) => (
        <Space>
          <Button
            type="primary"
            shape="circle"
            onClick={() => {
              showEditModal(record);
            }}
          >
            <EditOutlined />
          </Button>
        </Space>
      ),
    },
  ];

  // Modal
  // edit
  const showEditModal = (record) => {
    setIsEditModal(true);
    setRowData(record);
  };

  const editModalhandleCancel = () => {
    setIsEditModal(false);
  };

  const onAuthorityChange = (newAuthority) => {
    let formData = Object.assign(rowData, { authority: newAuthority });
    changeUserAuthority(formData).then((res) => {
      const { data } = res;
      if (data.code === 1300) {
        message.success({
          content: "修改成功",
          duration: 3,
        });
        setIsEditModal(false);
        dispatch(getUserListAction());
      } else {
        message.error({
          content: "修改失败: " + data.message,
          duration: 3,
        });
      }
    });
  };

  // add
  const showAddModal = () => {
    setIsAddModal(true);
  };

  const addModalhandleCancel = () => {
    setIsAddModal(false);
  };

  const changeQueryEmail = (e) => {
    setQueryEmail(e.target.value);
  };

  const queryEmailHandle = () => {
    getUser({ email: queryEmail }).then((res) => {
      const { data } = res;
      setQueryUsers(data.users);
    });
  };

  // JSX
  const HeaderObj = {
    leftHeader: <TitleWrapper>权限管理</TitleWrapper>,
    // midHeader: <div>mid</div>,
    rightHeader: (
      <DropDownWrapper>
        <Space>
          <Button onClick={showAddModal}>新增权限</Button>
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

        <Modal
          title="编辑权限"
          visible={isEditModal}
          onCancel={editModalhandleCancel}
          cancelText="取消"
          footer={null}
        >
          <Form
            {...formLayout}
            name={"editModal"}
            // form={editModalForm}
          >
            {Object.keys(rowData).map((item) => {
              if (!["key"].includes(item)) {
                if (item !== "authority") {
                  return (
                    <Form.Item key={item} label={transformWords[item]}>
                      {rowData[item]}
                    </Form.Item>
                  );
                } else {
                  return (
                    <Form.Item key={item} label={transformWords[item]}>
                      <Select
                        onChange={onAuthorityChange}
                        defaultValue={re_authority[rowData[item]]}
                      >
                        {Object.values(authority).map((sitem) => {
                          return parseInt(rowData[item]) !== sitem ? (
                            <Option key={sitem} value={sitem}>
                              {re_authority[sitem]}
                            </Option>
                          ) : null;
                        })}
                      </Select>
                    </Form.Item>
                  );
                }
              }
              return null;
            })}
            {/* {Object.keys(transformWords).map((item) => {
              // console.log(item);
              return (
                <Form.Item
                  key={item}
                  label={transformWords[item]}
                  name={item}
                  rules={formRules(item)}
                >
                  <Input
                  />
                </Form.Item>
              );
            })} */}
          </Form>
        </Modal>

        <Modal
          title="新增权限"
          visible={isAddModal}
          onCancel={addModalhandleCancel}
          cancelText="取消"
          okText="确定"
        >
          <Space>
            <Input
              placeholder={"请输入注册邮箱"}
              value={queryEmail}
              onChange={(e) => changeQueryEmail(e)}
            ></Input>
            <Button onClick={queryEmailHandle}>查询</Button>
          </Space>

          <Table columns={query_columns} dataSource={queryUsers} />
        </Modal>
      </ContainerWrapper>
    </Container>
  );
};

export default memo(Authority);
