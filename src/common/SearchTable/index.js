import React, { memo, useState, useEffect, useCallback } from "react";
import { Table, Input, Button, Space } from "antd";
import { SearchOutlined } from "@ant-design/icons";

import { TableWrapper } from "./style";

const SearchTable = memo((props) => {
  const {
    columns,
    dataSource,
    bordered = false,
    rowKey = {},
    pagination = {},
    defaultSearchText = "",
    defaultSearchedColumn = "",
  } = props;
  const [searchText, setSearchText] = useState(defaultSearchText);
  const [searchedColumn, setSearchedColumn] = useState(defaultSearchedColumn);

  const getIsSearchItems = (arr) =>
    arr.filter((item) => item.isSearch !== false);
  const isSearchItems = useCallback(() => getIsSearchItems(columns), [columns]);

  /* eslint-disable */
  useEffect(() => {
    if (searchText !== "") {
      let index = isSearchItems.findIndex(
        (item) => item.dataIndex === defaultSearchedColumn
      );
      let b = document.getElementsByClassName("ant-table-filter-trigger")[
        index
      ];
      b && b.click();

      // console.log(document.getElementById("searchButton"));
    }

    return;
  }, []);

  const getColumnSearchProps = (dataIndex) => {
    return {
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm = () => ({
          closeDropdown: false,
        }),
        clearFilters,
      }) => {
        if (selectedKeys[0] !== searchText) {
          setSelectedKeys([searchText]);
          // console.log(searchText, selectedKeys);
        }

        return (
          <div style={{ padding: 8 }}>
            <Input
              placeholder={`搜索条目`}
              value={searchText}
              onChange={(e) => {
                setSearchText(e.target.value);
                setSelectedKeys(e.target.value ? [e.target.value] : []);
              }}
              onPressEnter={() => {
                setSelectedKeys([searchText]);

                handleSearch(selectedKeys, confirm, dataIndex);
              }}
              style={{ width: 188, marginBottom: 8, display: "block" }}
              ref={(input) => input && input.focus()}
            />

            <Space>
              <Button
                id="searchButton"
                type="primary"
                onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                // icon={<i className="fa fa-search" aria-hidden="true"></i>}
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
        );
      },

      onFilter: (value, record) =>
        record[dataIndex]
          ? record[dataIndex]
              .toString()
              .toLowerCase()
              .includes(value.toLowerCase())
          : "",

      filterIcon: (filtered) => {
        return (
          <SearchOutlined
            style={{
              color: filtered ? "#1890ff" : undefined,
            }}
          />
        );
      },

      // Overwrite custom render, If not, we can't search.
      render: (dataIndex) => {
        return dataIndex;
      },
    };
  };

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);

    // console.log(selectedKeys, dataIndex);

    confirm();
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
          showSizeChanger: true,
          defaultCurrent: 1,
        }}
      />
    </TableWrapper>
  );
});

export default SearchTable;
