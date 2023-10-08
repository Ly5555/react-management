/*
 * @Author: liuyongqing
 * @Date: 2023-08-30 20:30:01
 * @LastEditors: liuyongqing
 * @LastEditTime: 2023-10-07 10:55:59
 */
import React, { useState, useEffect } from "react";
import { Button, Col, Form, Input, Row, Select, Space, Table } from "antd";
import { BatchRejectionModal } from "./components/index";
import { DownOutlined, UpOutlined } from "@ant-design/icons";
import { ColumnsType } from "antd/es/table/interface";
import request from "@/utils/request/request";
import { LoginForm } from "../LoginPage/components";
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
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });
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
  // const data = [
  //   {
  //     key: "11",
  //     name: "John Brown",
  //     age: 32,
  //     tel: "0571-22098909",
  //     phone: 18889898989,
  //     address: "New York No. 1 Lake Park",
  //   },
  //   {
  //     key: "12",
  //     name: "John Brown",
  //     age: 32,
  //     tel: "0571-22098909",
  //     phone: 18889898989,
  //     address: "New York No. 1 Lake Park",
  //   },
  //   {
  //     key: "13",
  //     name: "John Brown",
  //     age: 32,
  //     tel: "0571-22098909",
  //     phone: 18889898989,
  //     address: "New York No. 1 Lake Park",
  //   },
  //   {
  //     key: "14",
  //     name: "John Brown",
  //     age: 32,
  //     tel: "0571-22098909",
  //     phone: 18889898989,
  //     address: "New York No. 1 Lake Park",
  //   },
  //   {
  //     key: "1",
  //     name: "John Brown",
  //     age: 32,
  //     tel: "0571-22098909",
  //     phone: 18889898989,
  //     address: "New York No. 1 Lake Park",
  //   },
  //   {
  //     key: "15",
  //     name: "John Brown",
  //     age: 32,
  //     tel: "0571-22098909",
  //     phone: 18889898989,
  //     address: "New York No. 1 Lake Park",
  //   },
  //   {
  //     key: "16",
  //     name: "John Brown",
  //     age: 32,
  //     tel: "0571-22098909",
  //     phone: 18889898989,
  //     address: "New York No. 1 Lake Park",
  //   },
  //   {
  //     key: "2",
  //     name: "Jim Green",
  //     tel: "0571-22098333",
  //     phone: 18889898888,
  //     age: 42,
  //     address: "London No. 1 Lake Park",
  //   },
  //   {
  //     key: "3",
  //     name: "Joe Black",
  //     age: 32,
  //     tel: "0575-22098909",
  //     phone: 18900010002,
  //     address: "Sidney No. 1 Lake Park",
  //   },
  //   {
  //     key: "4",
  //     name: "Jim Red",
  //     age: 18,
  //     tel: "0575-22098909",
  //     phone: 18900010002,
  //     address: "London No. 2 Lake Park",
  //   },
  //   {
  //     key: "51",
  //     name: "Jake White",
  //     age: 18,
  //     tel: "0575-22098909",
  //     phone: 18900010002,
  //     address: "Dublin No. 2 Lake Park",
  //   },
  //   {
  //     key: "53",
  //     name: "Jake White",
  //     age: 18,
  //     tel: "0575-22098909",
  //     phone: 18900010002,
  //     address: "Dublin No. 2 Lake Park",
  //   },
  //   {
  //     key: "5",
  //     name: "Jake White",
  //     age: 18,
  //     tel: "0575-22098909",
  //     phone: 18900010002,
  //     address: "Dublin No. 2 Lake Park",
  //   },
  // ];
  const originData = [
    { id: 1, phone: 15800000000, name: "杨", info: "端口错误", time: "2022-12-12" },
    { id: 2, phone: 15800000000, name: "杨", info: "网络错误", time: "2022-12-13" },
    { id: 3, phone: 15800000000, name: "杨", info: "操作错误", time: "2022-12-14" },
    { id: 4, phone: 13600000000, name: "张", info: "端口错误", time: "2022-12-12" },
    { id: 5, phone: 13600000000, name: "张", info: "操作错误", time: "2022-12-13" },
    { id: 6, phone: 17700000000, name: "李", info: "端口错误", time: "2022-12-12" },
  ];
  const orderArr: number[] = [];
  originData.forEach((item) => {
    if (orderArr.includes(item.phone) === false) {
      orderArr.push(item.phone);
    }
  });

  const infoMap = new Map();
  originData.forEach((item, index) => {
    const nowItem = infoMap.get(item.phone);
    if (nowItem) {
      nowItem.ids.push(item.id);
      infoMap.set(item.phone, nowItem);
    } else {
      infoMap.set(item.phone, { startIndex: index, ids: [item.id] });
    }
  });
  const firstKeyArr = [];
  infoMap.forEach((value) => {
    firstKeyArr.push(value.startIndex);
  });
  const handleOnCell = (data: any, index: number | undefined) => {
    const infoItem = infoMap.get(data.phone);
    if (infoItem) {
      return { rowSpan: index === infoItem.startIndex ? infoItem.ids.length : 0 };
    }
    return { rowSpan: 1 };
  };
  const columns: any = [
    {
      title: "排序",
      dataIndex: "order",
      render: (text) => text + 1,
      onCell: handleOnCell,
    },
    {
      title: "电话",
      dataIndex: "phone",
      onCell: handleOnCell,
    },
    {
      title: "姓名",
      dataIndex: "name",
      onCell: handleOnCell,
    },
    {
      title: "信息",
      dataIndex: "info",
      width: "20%",
    },
    {
      title: "时间",
      dataIndex: "time",
    },
  ];
  const data = originData.map((item) => ({
    ...item,
    order: orderArr.indexOf(item.phone),
  }));

  const handleOnSelect = (record: any, selected: boolean, selectedRows: any) => {
    const infoItem = infoMap.get(record.phone);
    console.log(selectedRows);

    let newSelectedRowKeys = selectedRows.map((item: any) => item.id);
    console.log(newSelectedRowKeys);
    if (infoItem) {
      if (selected) {
        newSelectedRowKeys.push(...infoItem.ids);
      } else {
        newSelectedRowKeys = newSelectedRowKeys.filter((item: any) => infoItem.ids.includes(item as number) === false);
      }
    }

    setSelectedRowKeys(newSelectedRowKeys);
  };

  const handleOnSelectAll = (selected: any, selectedRows: any, changeRows: any) => {
    setSelectedRowKeys(selected ? data.map((item: any) => item.id) : []);
  };
  console.log(selectedRowKeys);

  // const columns: ColumnsType = [
  //   {
  //     title: "姓名",
  //     dataIndex: "name",
  //   },
  //   {
  //     title: "年龄",
  //     dataIndex: "age",
  //   },
  //   {
  //     title: "住址",
  //     dataIndex: "address",
  //   },
  //   {
  //     title: "Home phone",
  //     colSpan: 2,
  //     dataIndex: "tel",
  //     render: (value, row, index) => {
  //       const { current, pageSize } = pagination || {};
  //       const obj = {
  //         children: value,
  //         props: {},
  //       };
  //       let sameRowCount = 1;

  //       let totalIndex = pageSize * current;
  //       totalIndex = totalIndex > data.length ? data.length : totalIndex;
  //       const fullIndex = pageSize * (current - 1) + index;
  //       if (index !== 0 && data[fullIndex - 1].tel === data[fullIndex].tel) {
  //         sameRowCount = 0;
  //       } else {
  //         for (let i = fullIndex + 1; i < totalIndex; i++) {
  //           if (data[i].tel === data[fullIndex].tel) {
  //             sameRowCount++;
  //           } else {
  //             break;
  //           }
  //         }
  //       }
  //       obj.props.rowSpan = sameRowCount;
  //       return obj;
  //     },
  //   },
  //   {
  //     title: "Phone",
  //     colSpan: 0,
  //     dataIndex: "phone",
  //   },
  //   {
  //     title: "Address",
  //     dataIndex: "address",
  //   },
  //   {
  //     title: "操作",
  //     fixed: "right",
  //     render: () => {
  //       return (
  //         <Space>
  //           <a>查看</a>
  //           <a>编辑</a>
  //           <a style={{ color: "#ed4014" }}>删除</a>
  //         </Space>
  //       );
  //     },
  //   },
  // ];
  // const rowSelection = {
  //   selectedRowKeys,
  //   onChange: (newSelectedRowKeys: any) => {
  //     setSelectedRowKeys(newSelectedRowKeys);
  //   },
  //   getCheckboxProps: (record: any) => ({
  //     disabled: record.name === "Disabled User",
  //     name: record.name,
  //   }),
  //   renderCell(checked: any, record: any, index: number, originNode: any) {
  //     const { current, pageSize } = pagination || {};
  //     const obj = {
  //       children: originNode,
  //       props: {},
  //     };
  //     let sameRowCount = 1;
  //     let totalIndex = pageSize * current;
  //     totalIndex = totalIndex > data.length ? data.length : totalIndex;
  //     const fullIndex = pageSize * (current - 1) + index;
  //     if (index !== 0 && data[fullIndex - 1].tel === data[fullIndex].tel) {
  //       sameRowCount = 0;
  //     } else {
  //       for (let i = fullIndex + 1; i < totalIndex; i++) {
  //         if (data[i].tel === data[fullIndex].tel) {
  //           sameRowCount++;
  //         } else {
  //           break;
  //         }
  //       }
  //     }
  //     obj.props.rowSpan = sameRowCount;
  //     return obj;
  //   },
  // };
  // 需要合并的字段
  //合并数组单元格
  // const createNewArr = (data) => {
  //   return data
  //     .reduce((result, item) => {
  //       //首先将name字段作为新数组result取出
  //       if (result.indexOf(item.tel) < 0) {
  //         result.push(item.tel);
  //       }
  //       return result;
  //     }, [])
  //     .reduce((result, tel) => {
  //       //将name相同的数据作为新数组取出，并在其内部添加新字段**rowSpan**
  //       const children = data.filter((item) => item.tel === tel);
  //       result = result.concat(
  //         children.map((item, index) => ({
  //           ...item,
  //           rowSpan: index === 0 ? children.length : 0, //将第一行数据添加rowSpan字段
  //         })),
  //       );
  //       return result;
  //     }, []);
  // };
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
        columns={columns}
        dataSource={data}
        rowKey="id"
        rowSelection={{
          onCell: handleOnCell,
          onSelect: handleOnSelect,
          onSelectAll: handleOnSelectAll,
          selectedRowKeys: selectedRowKeys,
        }}
        bordered={true}
      />
    </>
  );
};
export default Index;
