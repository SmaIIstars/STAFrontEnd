import React, { memo, useEffect, useState } from "react";
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import { Menu, Dropdown, Button, Space, Modal, Input, Form } from "antd";
import { DownOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";

import { getPersonnelListAction } from "./store/actionCreatores";

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

import { transformWords } from "assets/local_data";

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
  const [rowData, setRowData] = useState({});

  useEffect(() => {
    dispatch(getPersonnelListAction());
  }, [dispatch]);

  if (
    localStorage.getItem("authority") > 0 &&
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

          <Button type="danger" shape="circle" onClick={showDeleteModal}>
            <DeleteOutlined />
          </Button>
        </Space>
      ),
    });
  }

  // Modal
  const [editModalForm] = Form.useForm();

  // Edit Modal
  const [name, setName] = useState("");
  const [degree, setDegree] = useState("");
  const [EB, setEB] = useState("");
  const [title, setTitle] = useState("");

  const showEditModal = (record) => {
    setRowData(record);
    setIsEditModal(true);

    setName(record["name"]);
    setDegree(record["degree"]);
    setEB(record["EB"]);
    setTitle(record["title"]);
  };

  const eidtModalhandleOk = () => {
    setIsEditModal(false);
    console.log(editModalForm.getFieldsValue(true));
    // console.log(editModalForm);
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

  // Delete Modal
  const showDeleteModal = () => {
    console.log("delete");
  };

  const getDataSource = (dataSource) =>
    dataSource
      ? dataSource.map((item) => {
          return Object.assign(item, { key: item.id });
        })
      : null;

  const dataSource = getDataSource(personnelList);

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

  const handleCancel = (name) => {
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
            dataSource={dataSource}
            bordered={true}
          />
        </SearchTableWrapper>

        <UploadWindow
          ModalProps={{
            isVisible: isImportPage,
            title: "新增数据",
            cancel: () => {
              handleCancel("import");
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
              handleCancel("cover");
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
            form={editModalForm}
          >
            {Object.keys(rowData).map((item) => {
              if (!["key", "id"].includes(item)) {
                let values = { name, degree, EB, title };
                return (
                  <Form.Item key={item} label={transformWords[item]}>
                    <Input
                      value={values[item]}
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
