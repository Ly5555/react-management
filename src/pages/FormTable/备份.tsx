/*
 * @Author: Lyq
 * @Date: 2023-08-30 20:30:01
 * @LastEditors: Lyq
 * @LastEditTime: 2024-03-11 20:30:44
 */
import React, { useState, useEffect } from "react";
import { Button, Col, Form, Input, Row, Select, Space, Table } from "antd";
import { DownOutlined, UpOutlined } from "@ant-design/icons";
import { lib } from "@/utils/request";

// form 表单封装初体验
const Index = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    const { data } = await lib.request({
      url: "https://www.fastmock.site/mock/302854084413bb6592dc4c53c7f85991/admin/channelOrder/list",
      method: "post",
    });
    const { dataList } = data || [];
  };
  const renderTel = (record, index, rowKey) => {
    const { current, pageSize } = pagination;
    let obj = {
      rowSpan: 0,
    };
    let sameRowCount = 1;
    let totalIndex = pageSize * current;
    totalIndex = totalIndex > data.length ? data.length : totalIndex;
    const fullIndex = pageSize * (current - 1) + index;
    if (index !== 0 && data[fullIndex - 1][rowKey] === data[fullIndex][rowKey]) {
      sameRowCount = 0;
    } else {
      for (let i = fullIndex + 1; i < totalIndex; i++) {
        if (data[i][rowKey] === data[fullIndex][rowKey]) {
          sameRowCount++;
        } else {
          break;
        }
      }
    }
    obj.rowSpan = sameRowCount;
    return obj;
  };
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      render: (text, record, index) => {
        return <a href="#">{text}</a>;
      },
    },
    {
      title: "Age",
      dataIndex: "age",
      onCell: (record, rowIndex) => renderTel(record, rowIndex, "age"),
    },
    {
      title: "Home phone",
      colSpan: 2,
      dataIndex: "tel",
      onCell: (record, rowIndex) => renderTel(record, rowIndex, "tel"),
    },
    {
      title: "Phone",
      colSpan: 0,
      dataIndex: "phone",
    },
    {
      title: "Address",
      dataIndex: "address",
    },
  ];

  const data: any = [
    {
      key: "11",
      name: "John Brown",
      age: 32,
      tel: "0571-22098909",
      phone: 18889898989,
      address: "New York No. 1 Lake Park",
    },
    {
      key: "12",
      name: "John Brown",
      age: 32,
      tel: "0571-22098909",
      phone: 18889898989,
      address: "New York No. 1 Lake Park",
    },
    {
      key: "13",
      name: "John Brown",
      age: 32,
      tel: "0571-22098909",
      phone: 18889898989,
      address: "New York No. 1 Lake Park",
    },
    {
      key: "14",
      name: "John Brown",
      age: 312,
      tel: "0571-22098909",
      phone: 18889898989,
      address: "New York No. 1 Lake Park",
    },
    {
      key: "1",
      name: "John Brown",
      age: 312,
      tel: "0571-22098909",
      phone: 18889898989,
      address: "New York No. 1 Lake Park",
    },
    {
      key: "15",
      name: "John Brown",
      age: 32,
      tel: "0571-22098909",
      phone: 18889898989,
      address: "New York No. 1 Lake Park",
    },
    {
      key: "16",
      name: "John Brown",
      age: 32,
      tel: "0571-22098909",
      phone: 18889898989,
      address: "New York No. 1 Lake Park",
    },
    {
      key: "2",
      name: "Jim Green",
      tel: "0571-22098333",
      phone: 18889898888,
      age: 42,
      address: "London No. 1 Lake Park",
    },
    {
      key: "3",
      name: "Joe Black",
      age: 32,
      tel: "0575-22098909",
      phone: 18900010002,
      address: "Sidney No. 1 Lake Park",
    },
    {
      key: "4",
      name: "Jim Red",
      age: 18,
      tel: "0575-22098909",
      phone: 18900010002,
      address: "London No. 2 Lake Park",
    },
    {
      key: "51",
      name: "Jake White",
      age: 18,
      tel: "0575-22098909",
      phone: 18900010002,
      address: "Dublin No. 2 Lake Park",
    },
    {
      key: "53",
      name: "Jake White",
      age: 18,
      tel: "0575-22098909",
      phone: 18900010002,
      address: "Dublin No. 2 Lake Park",
    },
    {
      key: "5",
      name: "Jake White",
      age: 18,
      tel: "0575-22098909",
      phone: 18900010002,
      address: "Dublin No. 2 Lake Park",
    },
  ];
  const infoMap = new Map();
  data.forEach((item: any, index: any) => {
    const nowItem = infoMap.get(item.tel);
    if (nowItem) {
      nowItem.ids.push(item.key);
      infoMap.set(item.tel, nowItem);
    } else {
      infoMap.set(item.tel, { startIndex: index, ids: [item.key] });
    }
  });

  const handleOnSelect = (record: any, selected: boolean, selectedRows: any) => {
    const infoItem = infoMap.get(record.tel);

    let newSelectedRowKeys = selectedRows.map((item) => item.key);
    if (infoItem) {
      if (selected) {
        newSelectedRowKeys.push(...infoItem.ids);
      } else {
        newSelectedRowKeys = newSelectedRowKeys.filter(
          (item) => infoItem.ids.includes(item as number) === false,
        );
      }
    }
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const handleOnSelectAll = (selected: boolean, selectedRows: any, changeRows: any) => {
    setSelectedRowKeys(selected ? selectedRows.map((item: { key: any }) => item.key) : []);
  };
  const handleChange = (pagination: any, filters: any, sorter: any) => {
    console.log("params", pagination, filters, sorter);
    setPagination(pagination);
  };

  return (
    <>
      <>选择几条数据：{selectedRowKeys}</>
      <Table
        size="small"
        rowSelection={{
          selectedRowKeys,
          onSelect: handleOnSelect,
          onCell: (record, index) => renderTel(record, index, "tel"),
          onSelectAll: handleOnSelectAll,
        }}
        rowKey="key"
        onChange={handleChange}
        columns={columns}
        dataSource={data}
        bordered={true}
      />
    </>
  );
};
export default Index;
