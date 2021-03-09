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
import { changePersonnelInfo, deletePersonnel } from "servers/personnel";

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

const Personnel = memo((props) => {
  const dispatch = useDispatch();

  const { personnelList } = useSelector((state) => {
    return {
      personnelList: state.getIn(["personnel", "personnelList"]),
    };
  }, shallowEqual);
  const [isImportPage, setIsImportPage] = useState(false);
  const [isCoverPage, setIsCoverPage] = useState(false);
  const [isEditModal, setIsEditModal] = useState(false);
  // const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [rowData, setRowData] = useState({});

  useEffect(() => {
    dispatch(getPersonnelListAction());
  }, [dispatch]);

  const columns = [
    {
      title: "姓名",
      dataIndex: "name",
      key: "name",
      align: "center",
    },
    {
      title: "学位",
      dataIndex: "degree",
      key: "degree",
      align: "center",
    },
    {
      title: "学历",
      dataIndex: "EB",
      key: "EB",
      align: "center",
    },
    {
      title: "职称",
      dataIndex: "title",
      key: "title",
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

  const getDataSource = (dataSource) =>
    dataSource
      ? dataSource.map((item) => {
          return Object.assign(item, { key: item.id });
        })
      : null;

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
  // It's a Array
  const [editModalForm] = Form.useForm();

  // Edit Modal
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [degree, setDegree] = useState("");
  const [EB, setEB] = useState("");
  const [title, setTitle] = useState("");

  const showEditModal = (record) => {
    setRowData(record);
    setIsEditModal(true);

    setId(record["id"]);
    setName(record["name"]);
    setDegree(record["degree"]);
    setEB(record["EB"]);
    setTitle(record["title"]);

    // The setState is async
    editModalForm.setFieldsValue({
      id: record["id"],
      name: record["name"],
      degree: record["degree"],
      EB: record["EB"],
      title: record["title"],
    });
  };

  const eidtModalhandleOk = () => {
    setIsEditModal(false);
    const values = editModalForm.getFieldsValue();
    changePersonnelInfo(values).then((res) => {
      const { data } = res;
      if (data.code === 1200) {
        message.success({
          content: "更新成功",
          duration: 3,
        });
      } else {
        message.error({
          content: "更新失败: " + data.message,
          duration: 3,
        });
      }
    });
    dispatch(getPersonnelListAction());
  };

  const editModalhandleCancel = () => {
    setIsEditModal(false);
  };

  const modalOnChange = (e, key) => {
    let value = e.target.value;
    switch (key) {
      case "name":
        setName(value);
        break;
      case "degree":
        setDegree(value);
        break;
      case "EB":
        setEB(value);
        break;
      case "title":
        setTitle(value);
        break;
      default:
        break;
    }
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
            dataSource={getDataSource(personnelList)}
            bordered={true}
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
          title="编辑数据"
          visible={isEditModal}
          onCancel={editModalhandleCancel}
          onOk={eidtModalhandleOk}
        >
          <Form
            labelCol={{
              span: 4,
            }}
            wrapperCol={{
              span: 14,
            }}
            name={"editModal"}
            form={editModalForm}
          >
            {Object.keys(rowData).map((item) => {
              // if (!["key", "id"].includes(item))

              if (!["key"].includes(item)) {
                let values = { name, degree, EB, title };

                return (
                  // The items must have name
                  <Form.Item
                    key={item}
                    label={transformWords[item]}
                    name={item}
                    style={item === "id" ? { display: "none" } : null}
                  >
                    <Input
                      values={item === "id" ? id : values[item]}
                      onChange={(e) => {
                        modalOnChange(e, item);
                      }}
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
