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

import { getPersonnelListAction } from "./store/actionCreatores";
import {
  changePersonnelInfo,
  deletePersonnel,
  addPersonnel,
} from "servers/personnel";

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

/* eslint-disable */
// const validateMessages = {
//   required: "${label} 不能为空!",
//   types: {
//     email: "'${label}' 格式不正确!",
//   },
// };

const formRules = (value) => {
  switch (value) {
    case "name":
    case "degree":
    case "EB":
    case "title":
      return [
        {
          required: true,
        },
      ];
    case "perid":
      return [
        {
          required: true,
        },
        {
          len: 12,
          // message: "学号 格式不正确!",
        },
      ];

    default:
      return null;
  }
};

const Personnel = memo((props) => {
  const dispatch = useDispatch();
  // It's a Array
  const [editModalForm] = Form.useForm();
  const [addModalForm] = Form.useForm();

  const { personnelList } = useSelector(
    (state) => ({
      personnelList: state.getIn(["personnel", "personnelList"]),
    }),
    shallowEqual
  );
  const [isImportPage, setIsImportPage] = useState(false);
  const [isCoverPage, setIsCoverPage] = useState(false);
  const [rowData, setRowData] = useState({});

  const [isEditModal, setIsEditModal] = useState(false);

  const [isAddModal, setIsAddModal] = useState(false);

  useEffect(() => {
    dispatch(getPersonnelListAction());
  }, [dispatch]);

  const columns = [
    {
      title: "#",
      dataIndex: "index",
      align: "center",
      isSearch: false,
      render: (text, record, index) => `${index + 1}`,
    },
    {
      title: "姓名",
      dataIndex: "name",
      align: "center",
    },
    {
      title: "学位",
      dataIndex: "degree",
      align: "center",
    },
    {
      title: "学历",
      dataIndex: "EB",
      align: "center",
    },
    {
      title: "职称",
      dataIndex: "title",
      align: "center",
    },
  ];

  if (
    localStorage.getItem("authority") > authority.guest &&
    !columns.find((item) => item.key === "operation")
  ) {
    columns.push({
      title: "操作",
      dataIndex: "operation",
      key: "operation",
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
        <DownloadAnchor text={"下载模板"} fileName="personnel" />
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
      values.filter((item) => [undefined, null, ""].includes(item)).length == 0
    ) {
      addPersonnel(formData).then((res) => {
        const { data } = res;
        if (data.code === 1200) {
          message.success({
            content: "新增成功",
            duration: 3,
          });
          setIsAddModal(false);
          dispatch(getPersonnelListAction());
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
      perid: record["perid"],
      name: record["name"],
      degree: record["degree"],
      EB: record["EB"],
      title: record["title"],
    });
  };

  const eidtModalhandleOk = () => {
    const formData = editModalForm.getFieldsValue();
    let values = Object.values(formData).map((item) =>
      item ? item.trim() : item
    );

    if (
      values.filter((item) => [undefined, null, ""].includes(item)).length == 0
    ) {
      changePersonnelInfo(formData).then((res) => {
        const { data } = res;
        if (data.code === 1200) {
          message.success({
            content: "更新成功",
            duration: 3,
          });
          setIsEditModal(false);
          dispatch(getPersonnelListAction());
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
    deletePersonnel(record).then((res) => {
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
    dispatch(getPersonnelListAction());
  };

  // JSX
  const HeaderObj = {
    leftHeader: <TitleWrapper>人员列表</TitleWrapper>,
    // midHeader: <div>mid</div>,
    rightHeader: (
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
    ),
  };

  return (
    <Container isHeader={true} Header={{ ...HeaderObj }}>
      <ContainerWrapper>
        <SearchTableWrapper>
          <SearchTable
            columns={columns}
            dataSource={personnelList}
            bordered={true}
            rowKey={(record) => record.perid}
          />
        </SearchTableWrapper>

        <UploadWindow
          ModalProps={{
            isVisible: isImportPage,
            title: "新增数据",
            cancel: () => {
              uploadHandleCancel("import");
            },
            oK: () => {},
          }}
          UploadProps={{
            accept: ".xlsx",
            action: "api/files/upload/import?type=personnel",
          }}
        />

        <UploadWindow
          ModalProps={{
            isVisible: isCoverPage,
            title: "覆盖数据",
            cancel: () => {
              uploadHandleCancel("cover");
            },
            oK: () => {},
          }}
          UploadProps={{
            accept: ".xlsx",
            action: "api/files/upload/cover?type=personnel",
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
            {Object.keys(transformWords).map((item) => {
              // console.log(item);
              return (
                <Form.Item
                  key={item}
                  label={transformWords[item]}
                  name={item}
                  rules={formRules(item)}
                >
                  <Input
                  // onChange={(e) => {
                  //   modalOnChange(e, item);
                  // }}
                  />
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
              // if (!["key", "id"].includes(item))

              if (!["key"].includes(item)) {
                return (
                  // The items must have name
                  <Form.Item
                    key={item}
                    label={transformWords[item]}
                    name={item}
                    style={item === "perid" ? { display: "none" } : null}
                    rules={formRules(item)}
                  >
                    <Input
                      disabled={item === "perid"}
                      // onChange={(e) => {
                      //   modalOnChange(e, item);
                      // }}
                    />
                  </Form.Item>
                );
              }
              return null;
            })}
          </Form>
        </Modal>
      </ContainerWrapper>
    </Container>
  );
});

export default Personnel;
