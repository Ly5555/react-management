/*
 * @Author: Lyq
 * @Date: 2024-03-06 21:44:25
 * @LastEditors: Lyq
 * @LastEditTime: 2024-03-18 20:18:35
 */
import React from "react";
import { Space, Table } from "antd";
import { createSearchParams, useNavigate } from "react-router-dom";
import { lib } from "@/utils/request";
import styles from "./index.mouule.less";
const RoleManage = () => {
  const navigate = useNavigate();
  const dataSource = [
    {
      key: "1",
      name: "我是权限页面",
      age: 32,
      address: "西湖区湖底公园1号",
    },
    {
      key: "2",
      name: "我是权限页面",
      age: 42,
      address: "西湖区湖底公园1号",
    },
  ];

  const columns = [
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
      key: "action",
      render: (text: any, record: any, index: any) => (
        <Space>
          <a onClick={handleClick}>查看</a>
          <a>删除</a>
        </Space>
      ),
    },
  ];
  const handleClick = () => {
    const params = { id: "1", name: "zhangsan" };
    navigate({
      pathname: "/details",
      search: `?${createSearchParams(params)}`,
    });
  };
  return (
    <div className={styles.roleManageBox}>
      <Table bordered size="small" dataSource={dataSource} columns={columns} />
    </div>
  );
};

export default RoleManage;
