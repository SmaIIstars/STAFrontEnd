import React, { memo, useEffect } from "react";
import { shallowEqual, useSelector, useDispatch } from "react-redux";

import { getPersonnelListAction } from "./store/actionCreatores";

import Container from "common/Container";
import SearchTable from "common/SearchTable";
import { ContainerWrapper } from "./style";

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
  const { userInfo, personnelList } = useSelector((state) => {
    return {
      userInfo: state.getIn(["app", "userInfo"]),
      personnelList: state.getIn(["personnel", "personnelList"]),
    };
  }, shallowEqual);

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
