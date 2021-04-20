import React, { memo, useState } from "react";
import { Table, Input, Button, Space } from "antd";
import { SearchOutlined } from "@ant-design/icons";

import { TableWrapper } from "./style";

const SearchTable = memo((props) => {
  const {
    columns,
    dataSource,
    bordered = false,
    rowKey = {},
    pagination = {
      showSizeChanger: true,
      defaultCurrent: 1,
    },
  } = props;
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />

        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<i className="fa fa-search" aria-hidden="true"></i>}
            size="small"
            style={{ width: 90 }}
          >
            搜索
          </Button>

          <Button
            onClick={() => handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            重置
          </Button>
        </Space>
      </div>
    ),

    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : "",

    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1890ff" : undefined,
        }}
      />
    ),

    // Overwrite custom render, If not, we can't search.
    render: (dataIndex) => {
      return dataIndex;
    },
  });

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    console.log(searchText, searchedColumn, dataIndex);
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  columns.forEach((item) => {
    if (item.isSearch === undefined || item.isSearch === true) {
      Object.assign(item, getColumnSearchProps(item.dataIndex));
    }
  });

  return (
    <TableWrapper>
      <Table
        columns={columns}
        dataSource={dataSource}
        bordered={bordered}
        rowKey={rowKey}
        pagination={{
          ...pagination,
          total: columns.size,
        }}
      />
    </TableWrapper>
  );
});

export default SearchTable;
