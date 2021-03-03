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

  const showEditModal = (record) => {
    setRowData(record);
    setIsEditModal(true);
  };

  const eidtModalhandleOk = () => {
    setIsEditModal(false);
  };

  const editModalhandleCancel = () => {
    setIsEditModal(false);
  };

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
          >
            {Object.keys(rowData).map((item) => {
              if (item !== "key") {
                return (
                  <Form.Item key={item} label={item}>
                    <Input value={rowData[item]} />
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
