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
  Tooltip,
  Drawer,
  List,
  // Switch,
} from "antd";
import {
  EditOutlined,
  QuestionCircleOutlined,
  EnterOutlined,
  RightOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

import { getUserListAction } from "./store/actionCreatores";
import Container from "common/Container";
import SearchTable from "common/SearchTable";
import {
  ContainerWrapper,
  TitleWrapper,
  SearchTableWrapper,
  DropDownWrapper,
  ListItemWrapper,
  TagsWrapper,
} from "./style";

import { changeUserAuthority } from "servers/authority";
import { getUser } from "servers/user";
import {
  transformWords,
  authority,
  re_authority,
  tagColors,
} from "assets/local_data";

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

// const switchProps = { checkedChildren: 0, unCheckedChildren: 1 };

const Authority = (props) => {
  const dispatch = useDispatch();
  const [isEditModal, setIsEditModal] = useState(false);
  const [isEditAuthorityModal, setIsEditAuthorityModal] = useState(false);
  const [rowData, setRowData] = useState({});
  const [queryEmail, setQueryEmail] = useState();
  const [queryUsers, setQueryUsers] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [isDrawer, setIsDrawer] = useState(false);
  // const [selectedTags, setSelectedTags] = useState(0);

  useEffect(() => {
    dispatch(getUserListAction());
  }, [dispatch]);

  const { userList } = useSelector(
    (state) => ({
      userList: state.getIn(["authority", "userList"]),
    }),
    shallowEqual
  );

  // const onShowSizeChange = (current, pageSize) => setPageSize(pageSize);

  const onSelectChange = (selectedRowKeys, selectedRows) => {
    setSelectedRowKeys(selectedRowKeys);
    setSelectedRows(
      selectedRows.map((item) => {
        let newAuthority = Object.values(authority).filter(
          (val) => parseInt(item.authority) !== val
        )[0];
        return Object.assign(item, { newAuthority });
      })
    );
  };

  // Modal
  // edit
  const showEditModal = (record) => {
    setIsEditModal(true);
    setRowData(record);
  };

  const editModalhandleCancel = () => {
    setIsEditModal(false);
  };

  const onAuthorityChange = (info) => {
    changeUserAuthority(info).then((res) => {
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

  // EditAuthorith
  const showEditAuthorityModal = () => {
    setIsEditAuthorityModal(true);
    setQueryEmail("");
    setSelectedRows([]);
    setSelectedRowKeys([]);
    setQueryUsers([]);
  };

  const editAuthorityModalhandleCancel = () => {
    setIsEditAuthorityModal(false);
  };

  const tagSelectOnchange = (row, value) => {
    setSelectedRows(
      selectedRows.filter((item) => {
        if (item.email === row.email)
          return Object.assign(item, { newAuthority: authority[value] });
        return item;
      })
    );
  };

  const editAuthorityModalhandleOk = () => {
    // console.log(selectedRows);
    changeUserAuthority(selectedRows).then((res) => {
      const { data } = res;
      if (data.code === 1300) {
        message.success({
          content: "编辑成功",
          duration: 3,
        });
        setIsEditAuthorityModal(false);
        dispatch(getUserListAction());
      } else {
        message.error({
          content: "编辑失败: " + data.message,
          duration: 3,
        });
      }
    });
  };

  const changeQueryEmail = (e) => {
    setQueryEmail(e.target.value);
  };

  const queryEmailHandle = () => {
    getUser({ email: queryEmail }).then((res) => {
      const { data } = res;
      setQueryUsers(data.users);
      // setQueryUsers(data.users.filter((item) => item.email !== user.email));
    });
  };

  // Drawer
  const showDrawer = () => {
    setIsDrawer(true);
  };

  const drawerOnClose = () => {
    setIsDrawer(false);
  };

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

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const deleteSelectedRow = (row) => {
    setSelectedRowKeys(selectedRowKeys.filter((value) => value !== row.email));
    setSelectedRows(selectedRows.filter((value) => value !== row));
  };

  // JSX
  const HeaderObj = {
    leftHeader: <TitleWrapper>权限管理</TitleWrapper>,
    // midHeader: <div>mid</div>,
    rightHeader: (
      <DropDownWrapper>
        <Space>
          <Button onClick={showEditAuthorityModal}>批量编辑</Button>
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
            dataSource={userList}
            bordered={true}
            rowKey={(record) => record.email}
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
                      onChange={(newAuthority) => {
                        rowData["authority"] = newAuthority;
                        onAuthorityChange(rowData);
                      }}
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
            })}
          </Form>
        </Modal>

        <Modal
          title="批量编辑权限"
          visible={isEditAuthorityModal}
          onCancel={editAuthorityModalhandleCancel}
          onOk={editAuthorityModalhandleOk}
          cancelText="取消"
          okText="确定"
        >
          <Space>
            <Input
              placeholder={"请输入注册邮箱"}
              value={queryEmail}
              onChange={(e) => changeQueryEmail(e)}
              onPressEnter={queryEmailHandle}
              suffix={<EnterOutlined style={{ color: "grey" }} />}
            ></Input>

            <Button onClick={showDrawer}>已选列表</Button>

            <Tooltip
              placement="top"
              title={["选择为跨页选择", "默认修改到升序第一个非原权限"].map(
                (item, index) => (
                  <div key={index}>
                    {index + 1}. {item}
                  </div>
                )
              )}
              arrowPointAtCenter
            >
              <QuestionCircleOutlined />
            </Tooltip>
          </Space>

          <Table
            columns={query_columns}
            dataSource={queryUsers}
            rowKey={(record) => record.email}
            pagination={{
              size: "small",
              pageSize: 5,
              // pageSizeOptions: [5, 10],
              // showSizeChanger: true,
              // onShowSizeChange: onShowSizeChange,
            }}
            rowSelection={rowSelection}
          />

          <Drawer
            title="已选列表"
            closable={false}
            onClose={drawerOnClose}
            visible={isDrawer}
            width={640}
          >
            <List
              bordered
              dataSource={selectedRows}
              renderItem={(item) => {
                let authority_keys = Object.keys(authority);

                return (
                  <List.Item>
                    <ListItemWrapper>
                      <span>{item.username}</span>
                      <span>{item.email}</span>
                      <Space>
                        {authorityTags[item.authority]}
                        <RightOutlined style={{ color: "grey" }} />
                        <TagsWrapper {...tagColors[item.newAuthority]}>
                          <Select
                            style={{
                              width: 76,
                              ...tagColors[item.newAuthority],
                            }}
                            size="small"
                            showArrow={false}
                            defaultValue={authority_keys[item.newAuthority]}
                            onChange={(value) => tagSelectOnchange(item, value)}
                          >
                            {Object.keys(authorityTags).map((sitem) => {
                              return (
                                <Select.Option
                                  value={authority_keys[sitem]}
                                  key={authority_keys[sitem]}
                                  disabled={sitem === item.authority}
                                >
                                  <span
                                    style={{
                                      fontSize: "12px",
                                    }}
                                  >
                                    {re_authority[sitem]}
                                  </span>
                                </Select.Option>
                              );
                            })}
                          </Select>
                        </TagsWrapper>
                        {/* {authorityTags[item.newAuthority]} */}
                        {/* {authorityTagsList
                          .filter((sitem) => sitem === selectedTags)
                          .map((sitem, index) => (
                            <TagsWrapper
                              key={index}
                              onClick={() => changeTag(item)}
                            >
                              {authorityTags[sitem]}
                            </TagsWrapper>
                          ))} */}
                      </Space>
                      <DeleteOutlined
                        style={{
                          color: "red",
                          fontSize: "16px",
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          deleteSelectedRow(item);
                        }}
                      />
                    </ListItemWrapper>
                  </List.Item>
                );
              }}
            />
          </Drawer>
        </Modal>
      </ContainerWrapper>
    </Container>
  );
};

export default memo(Authority);
