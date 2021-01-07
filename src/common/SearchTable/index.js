import React, { memo, useState } from "react";
import { Table, Input, Button, Space } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const SearchTable = memo((props) => {
  const { columns, dataSource, bordered = false } = props;
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [pageSize, setPageSize] = useState(5);

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
            Search
          </Button>

          <Button
            onClick={() => handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
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
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),

    render: (dataIndex) => {
      return dataIndex;
    },
  });

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    console.log(searchText, searchedColumn);
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const onShowSizeChange = (current, pageSize) => {
    setPageSize(pageSize);
  };

  columns.forEach((item) => {
    Object.assign(item, getColumnSearchProps(item.key));
  });

  return (
    <Table
      columns={columns}
      dataSource={dataSource}
      bordered={bordered}
      pagination={{
        pageSize: pageSize,
        pageSizeOptions: [1, 3, 5, 10],
        total: 7,
        showSizeChanger: true,
        onShowSizeChange: onShowSizeChange,
      }}
    />
  );
});

export default SearchTable;
