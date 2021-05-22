import React, { memo, useEffect, useState } from "react";
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import {
  Menu,
  Dropdown,
  Button,
  Space,
  Modal,
  Input,
  Form,
  Popconfirm,
  message,
} from "antd";
import { DownOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";

import { getMeetingListAction } from "./store/actionCreatores";
import { changeMeetingInfo, deleteMeeting, addMeeting } from "servers/meeting";

import Container from "common/Container";
import SearchTable from "common/SearchTable";
import DownloadAnchor from "common/DownloadAnchor";
import UploadWindow from "components/UploadWindow";
import {
  ContainerWrapper,
  SearchTableWrapper,
  TitleWrapper,
  DropDownWrapper,
} from "./style";

import { transformWords, authority } from "assets/local_data";

const formLayout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    offset: 1,
    span: 14,
  },
};

const formRules = (value) => {
  switch (value) {
    case "id":
    case "name":
    case "member":
    case "time":
    case "address":
    case "type":
    case "note":
      return [
        {
          required: true,
        },
      ];
    default:
      return null;
  }
};

const Meeting = memo((props) => {
  const dispatch = useDispatch();
  // It's a Array
  const [editModalForm] = Form.useForm();
  const [addModalForm] = Form.useForm();

  const { meetingList, total } = useSelector((state) => {
    return {
      meetingList: state.getIn(["meeting", "meetingList"]),
      total: state.getIn(["meeting", "total"]),
    };
  }, shallowEqual);

  const [isImportPage, setIsImportPage] = useState(false);
  const [isCoverPage, setIsCoverPage] = useState(false);
  const [rowData, setRowData] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const [isEditModal, setIsEditModal] = useState(false);
  const [isAddModal, setIsAddModal] = useState(false);
  const isAuthority = localStorage.getItem("authority") > authority.guest;

  useEffect(() => {
    dispatch(getMeetingListAction("all", currentPage, pageSize));
  }, [dispatch, currentPage, pageSize]);

  const columns = [
    {
      title: "#",
      dataIndex: "index",
      key: "index",
      align: "center",
      isSearch: false,
      render: (text, record, index) => `${index + 1}`,
    },
    {
      title: "会议名称",
      dataIndex: "name",
      align: "center",
    },
    {
      title: "会议时间",
      dataIndex: "time",
      align: "center",
    },
    {
      title: "会议地址",
      dataIndex: "address",
      align: "center",
    },
  ];
  if (isAuthority && !columns.find((item) => item.key === "operation")) {
    columns.push({
      title: "操作",
      dataIndex: "operation",
      align: "center",
      width: "15%",
      isSearch: false,
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

          <Popconfirm
            title="确定要删除此行数据吗?"
            okText="确定"
            cancelText="取消"
            onConfirm={() => {
              popconfirmOnConfirm(record);
            }}
          >
            <Button type="danger" shape="circle">
              <DeleteOutlined />
            </Button>
          </Popconfirm>
        </Space>
      ),
    });
  }

  const menu = (
    <Menu>
      <Menu.Item>
        <DownloadAnchor text={"下载模板"} fileName="meeting" />
      </Menu.Item>

      <Menu.Item>
        <span onClick={() => setIsImportPage(true)}>新增数据</span>
      </Menu.Item>

      <Menu.Item>
        <span onClick={() => setIsCoverPage(true)}>覆盖数据</span>
      </Menu.Item>
    </Menu>
  );

  // Upload
  const uploadHandleCancel = (name) => {
    // console.log(name);
    switch (name) {
      case "import":
        setIsImportPage(false);
        break;
      case "cover":
        setIsCoverPage(false);
        break;
      default:
        break;
    }
    dispatch(getMeetingListAction("all", currentPage, pageSize));
  };

  // Modal

  // Add Modal
  const addModalhandleReset = () => {
    addModalForm.resetFields();
  };

  const showAddModal = () => {
    setIsAddModal(true);
  };

  const addModalhandleCancel = () => {
    setIsAddModal(false);
  };

  const addModalhandleOk = () => {
    // setIsAddModal(false);
    const formData = addModalForm.getFieldsValue();
    let values = Object.values(formData).map((item) =>
      item ? item.trim() : item
    );

    if (
      values.filter((item) => [undefined, null, ""].includes(item)).length === 0
    ) {
      addMeeting(formData).then((res) => {
        const { data } = res;
        if (data.code === 1200) {
          message.success({
            content: "新增成功",
            duration: 3,
          });
          setIsAddModal(false);
          dispatch(getMeetingListAction("all", currentPage, pageSize));
        } else {
          message.error({
            content: "新增失败: " + data.message,
            duration: 3,
          });
        }
      });
    } else {
      message.error({
        content: "发送请求错误! 请检查表格内容是否完整!",
        duration: 3,
      });
    }
  };

  // Edit Modal
  const showEditModal = (record) => {
    setRowData(record);
    setIsEditModal(true);

    // The setState is async
    editModalForm.setFieldsValue({
      id: record["id"],
      name: record["name"],
      member: record["member"],
      time: record["time"],
      address: record["address"],
      type: record["type"],
      note: record["note"],
    });
  };

  const eidtModalhandleOk = () => {
    const formData = editModalForm.getFieldsValue();
    let values = Object.values(formData).map((item) =>
      item ? item.trim() : item
    );

    if (
      values.filter((item) => [undefined, null, ""].includes(item)).length === 0
    ) {
      changeMeetingInfo(formData).then((res) => {
        const { data } = res;
        if (data.code === 1200) {
          message.success({
            content: "更新成功",
            duration: 3,
          });
          setIsEditModal(false);
          dispatch(getMeetingListAction("all", currentPage, pageSize));
        } else {
          message.error({
            content: "更新失败: " + data.message,
            duration: 3,
          });
        }
      });
    } else {
      message.error({
        content: "发送请求错误! 请检查表格内容是否完整!",
        duration: 3,
      });
    }
  };

  const editModalhandleCancel = () => {
    setIsEditModal(false);
  };

  // Delete Button
  const popconfirmOnConfirm = (record) => {
    deleteMeeting(record).then((res) => {
      const { data } = res;
      if (data.code === 1200) {
        message.success({
          content: "删除成功",
          duration: 3,
        });
      } else {
        message.error({
          content: "删除失败: " + data.message,
          duration: 3,
        });
      }
    });
    dispatch(getMeetingListAction("all", currentPage, pageSize));
  };

  const onChangePagination = (page, pageSize) => {
    setCurrentPage(page);
  };

  const onShowSizeChange = (current, pageSize) => {
    setPageSize(pageSize);
  };

  // JSX
  const HeaderObj = {
    leftHeader: <TitleWrapper>专利列表</TitleWrapper>,
    // midHeader: <div>mid</div>,
    rightHeader: isAuthority ? (
      <DropDownWrapper>
        <Space>
          <Dropdown overlay={menu}>
            <Button onClick={(e) => e.preventDefault()}>
              数据导入 <DownOutlined />
            </Button>
          </Dropdown>

          <Button onClick={showAddModal}>新增数据</Button>
        </Space>
      </DropDownWrapper>
    ) : null,
  };

  return (
    <Container isHeader={true} Header={{ ...HeaderObj }}>
      <ContainerWrapper>
        <SearchTableWrapper>
          <SearchTable
            columns={columns}
            dataSource={meetingList}
            bordered={true}
            rowKey={(record) => record.id}
            pagination={{
              pageSizeOptions: [10, 15, 20],
              pageSize: pageSize,
              onChange: onChangePagination,
              onShowSizeChange: onShowSizeChange,
              total,
              position: ["bottomright"],
            }}
          />
        </SearchTableWrapper>

        <UploadWindow
          ModalProps={{
            isVisible: isImportPage,
            title: "新增数据",
            cancel: () => uploadHandleCancel("import"),
          }}
          UploadProps={{
            accept: ".xlsx",
            action: "api/files/upload/import?type=meeting",
          }}
        />

        <UploadWindow
          ModalProps={{
            isVisible: isCoverPage,
            title: "覆盖数据",
            cancel: () => {
              uploadHandleCancel("cover");
            },
          }}
          UploadProps={{
            accept: ".xlsx",
            action: "api/files/upload/cover?type=meeting",
          }}
        />

        <Modal
          title="添加数据"
          visible={isAddModal}
          onCancel={addModalhandleCancel}
          onOk={addModalhandleOk}
          footer={[
            <Button key="reset" onClick={addModalhandleReset}>
              重置
            </Button>,

            <Button key="back" onClick={addModalhandleCancel}>
              取消
            </Button>,

            <Button key="submit" type="primary" onClick={addModalhandleOk}>
              确定
            </Button>,
          ]}
        >
          <Form
            {...formLayout}
            name={"addModal"}
            form={addModalForm}
            // validateMessages={validateMessages}
          >
            {Object.keys(transformWords.meeting).map((item) => {
              return (
                <Form.Item
                  key={item}
                  label={transformWords.meeting[item]}
                  name={item}
                  rules={formRules(item)}
                >
                  <Input />
                </Form.Item>
              );
            })}
          </Form>
        </Modal>

        <Modal
          title="编辑数据"
          visible={isEditModal}
          onCancel={editModalhandleCancel}
          onOk={eidtModalhandleOk}
          okText={"确定"}
          cancelText={"取消"}
        >
          <Form {...formLayout} name={"editModal"} form={editModalForm}>
            {Object.keys(rowData).map((item) => {
              // console.log(item);
              return (
                // The items must have name
                <Form.Item
                  key={item}
                  label={transformWords.meeting[item]}
                  name={item}
                  style={item === "id" ? { display: "none" } : null}
                  rules={formRules(item)}
                >
                  <Input disabled={item === "id"} />
                </Form.Item>
              );
            })}
          </Form>
        </Modal>
      </ContainerWrapper>
    </Container>
  );
});

export default Meeting;
