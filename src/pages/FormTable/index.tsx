/*
 * @Author: liuyongqing
 * @Date: 2023-08-30 20:30:01
 * @LastEditors: liuyongqing
 * @LastEditTime: 2023-10-11 21:54:13
 */
import React, { useState, useEffect } from "react";
import { Button, Col, Form, Input, Row, Select, Space, Table } from "antd";
import { BatchRejectionModal } from "./components/index";
import { DownOutlined, UpOutlined } from "@ant-design/icons";
import request from "@/utils/request/request";
const SearchForm = () => {
  const [expand, setExpand] = useState(false);
  const [form] = Form.useForm();
  const { Option } = Select;
  const formStyle = {
    maxWidth: "none",
    padding: 24,
    marginBottom: "20px",
  };
  const getFields = () => {
    const count = expand ? 10 : 3;
    const children = [];
    for (let i = 0; i < count; i++) {
      children.push(
        <Col span={6} key={i}>
          <Form.Item name={`field-${i}`} label={`Field ${i}`}>
            {i % 3 !== 1 ? (
              <Input placeholder="placeholder" />
            ) : (
              <Select>
                <Option value="1">1</Option>
                <Option value="2">
                  longlonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglong
                </Option>
              </Select>
            )}
          </Form.Item>
        </Col>,
      );
    }
    return children;
  };
  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
  };
  return (
    <Form form={form} name="advanced_search" style={formStyle} onFinish={onFinish}>
      <Row gutter={24}>
        {getFields()}
        <Col span={expand ? "12" : 6} style={{ textAlign: "right" }}>
          <Button type="primary" htmlType="submit">
            搜索
          </Button>
          <Button
            style={{ margin: "0 8px" }}
            onClick={() => {
              form.resetFields();
            }}>
            重置
          </Button>
          <a
            style={{ fontSize: 12 }}
            onClick={() => {
              setExpand(!expand);
            }}>
            {expand ? (
              <>
                <UpOutlined /> 折叠
              </>
            ) : (
              <>
                <DownOutlined /> 更多
              </>
            )}
          </a>
        </Col>
      </Row>
    </Form>
  );
};
// form 表单封装初体验
const Index = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [rowspanArray, setRowspanArray] = useState([]);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    const { data } = await request({
      url: "https://www.fastmock.site/mock/302854084413bb6592dc4c53c7f85991/admin/channelOrder/list",
      method: "post",
    });
    const { dataList } = data || [];
  };
  const renderTel = (text, row, index, rowKey) => {
    // console.log(text, "98");
    const { current, pageSize } = pagination;
    const obj = {
      children: text,
      props: {},
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
    obj.props.rowSpan = sameRowCount;
    return obj;
  };
  const renderTel2 = (record, index, rowKey) => {
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
      render: (text, row, index) => renderTel(text, row, index, "age"),
    },
    {
      title: "Home phone",
      colSpan: 2,
      dataIndex: "tel",
      onCell: (record, rowIndex) => renderTel2(record, rowIndex, "tel"),
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
      age: 32,
      tel: "0571-22098909",
      phone: 18889898989,
      address: "New York No. 1 Lake Park",
    },
    {
      key: "1",
      name: "John Brown",
      age: 32,
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

  const handleOnSelect = (record: any, selected: boolean, selectedRows: any) => {};
  const handleOnSelectAll = (selected: boolean, selectedRows: any, changeRows: any) => {};
  const handleChange = (pagination: any, filters: any, sorter: any) => {
    console.log("params", pagination, filters, sorter);
    setPagination(pagination);
  };
  return <Table size="small" onChange={handleChange} columns={columns} dataSource={data} bordered={true} />;
};
export default Index;
