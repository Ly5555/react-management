/*
 * @Author: liuyongqing
 * @Date: 2023-08-30 20:30:01
 * @LastEditors: liuyongqing
 * @LastEditTime: 2023-09-06 20:34:43
 */
import React, { useState, useEffect } from "react";
import { Button, Col, Form, Input, Row, Select, Space, Table } from "antd";
import { BatchRejectionModal } from "./components/index";
import { DownOutlined, UpOutlined } from "@ant-design/icons";
import { ColumnsType } from "antd/es/table/interface";
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
  const [dataSource, setDataSource] = useState([]);
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    const { data } = await request({
      url: "https://www.fastmock.site/mock/302854084413bb6592dc4c53c7f85991/admin/channelOrder/list",
      method: "post",
    });
    const { dataList } = data || [];
    setDataSource(dataList);
  };
  const data = [];

  for (let i = 0; i < 46; i++) {
    data.push({
      key: i,
      name: `Edward King ${i}`,
      age: 32,
      address: `London, Park Lane no. ${i}`,
    });
  }
  const columns: ColumnsType = [
    {
      title: "姓名",
      dataIndex: "channelName",
    },
    {
      title: "年龄",
      dataIndex: "outOrderNo",
    },
    {
      title: "住址",
      dataIndex: "aftermarketStatusName",
    },
    {
      title: "操作",
      fixed: "right",
      render: () => {
        return (
          <Space>
            <a>查看</a>
            <a>编辑</a>
            <a style={{ color: "#ed4014" }}>删除</a>
          </Space>
        );
      },
    },
  ];
  const rowSelection = {
    selectedRowKeys,
    onChange: (newSelectedRowKeys: any) => {
      setSelectedRowKeys(newSelectedRowKeys);
    },
    getCheckboxProps: (record: any) => ({
      disabled: record.name === "Disabled User",
      name: record.name,
    }),
  };
  return (
    <>
      {/* <SearchForm /> */}
      <Space style={{ display: "flex", padding: "10px 0" }}>
        <Space align={"center"}>
          <div
            style={{
              border: "1px solid #abdcff",
              borderRadius: "6px",
              padding: "0 10px",
              background: "#f0faff",
            }}>
            <Space>
              <div>已选择 {selectedRowKeys.length} 项</div>
            </Space>
          </div>
        </Space>
        <BatchRejectionModal data={selectedRowKeys} selectArray={setSelectedRowKeys} />
      </Space>
      <Table
        dataSource={dataSource}
        columns={columns}
        bordered
        rowKey={"aftermarketNo"}
        size="small"
        rowSelection={{
          type: "checkbox",
          ...rowSelection,
        }}
      />
    </>
  );
};

export default Index;
