/*
 * @Author: Lyq
 * @Date: 2023-12-28 22:05:04
 * @LastEditors: Lyq
 * @LastEditTime: 2024-01-06 21:36:24
 */
import React, { useCallback, useEffect, useRef, useState } from "react";
import { searchList } from "./model";
import { BasicTable, BasicSearch } from "@/components";
import styles from "./index.module.less";
import { Button, Space, Table } from "antd";
// 初始化搜索
const initSearch = {
  pay_date: [1703166192025, 1703338992025],
  ids: ["ZTO"],
  userId: "BeiJing",
  isHide: true,
};
const Index = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const handleSearch = useCallback(async (values: any) => {
    // 数据转换
    const query = { ...values };
    console.log(query, "我是请求参数");
    try {
      setLoading(true);
      // await getDataTrends(query);
    } finally {
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    handleSearch(initSearch);
  }, [handleSearch]);

  const dataSource = [
    {
      key: "1",
      name: "胡彦斌",
      age: 32,
      address: "西湖区湖底公园1号",
    },
    {
      key: "2",
      name: "胡彦祖",
      age: 42,
      address: "西湖区湖底公园1号",
    },
  ];

  const columns: any[] = [
    {
      title: "姓名",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "年龄",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "住址",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Action",
      key: "operation",
      fixed: "right",
      width: 100,
      render: () => (
        <Space>
          <Button type="link">编辑</Button>
          <Button type="link" danger>
            删除
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className={styles.formTable_box}>
      <BasicSearch list={searchList} data={initSearch} isLoading={isLoading} handleFinish={handleSearch} />
      <div className={styles.table_box}>
        <Table loading={isLoading} columns={columns} dataSource={dataSource} />
      </div>
    </div>
  );
};

export default Index;
