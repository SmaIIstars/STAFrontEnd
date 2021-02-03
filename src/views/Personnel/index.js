import React, { memo, useEffect, useState } from "react";
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import { Menu, Dropdown, Button } from "antd";
import { DownOutlined } from "@ant-design/icons";

import { getPersonnelListAction } from "./store/actionCreatores";

import Container from "common/Container";
import SearchTable from "common/SearchTable";
import DownloadAnchor from "common/DownloadAnchor";
import UploadWindow from "components/UploadWindow";
import { ContainerWrapper, SearchTableWrapper, TitleWrapper } from "./style";

const columns = [
  {
    title: "姓名",
    dataIndex: "name",
    key: "name",
    width: "30%",
    align: "center",
  },
  {
    title: "学位",
    dataIndex: "degree",
    key: "degree",
    width: "20%",
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

  useEffect(() => {
    dispatch(getPersonnelListAction());
  }, [dispatch]);

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
        <DownloadAnchor text={"下载模板"} fileName="123" />
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
      <Dropdown overlay={menu}>
        <Button onClick={(e) => e.preventDefault()}>
          数据导入 <DownOutlined />
        </Button>
      </Dropdown>
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
            accept: ".xls, .xlsx",
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
        />
      </ContainerWrapper>
    </Container>
  );
});

export default Personnel;
