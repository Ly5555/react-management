/*
 * @Author: Lyq
 * @Date: 2024-03-25 21:36:18
 * @LastEditors: Lyq
 * @LastEditTime: 2024-03-25 22:05:56
 */
//@ts-nocheck
import React, { useEffect, useState } from "react";
import { Table, Button } from "antd";
const Child = (props) => {
  const columns = [
    {
      title: "一级菜单",
      dataIndex: "name",
    },
    {
      title: "二级菜单",
      dataIndex: "age",
    },
    {
      title: "三级菜单",
      dataIndex: "address",
    },
    {
      title: "按钮",
      dataIndex: "address",
    },
  ];
  return (
    <>
      <Button type="primary">保存2</Button>
      <Table columns={columns} bordbordered size="small" ered pagination={false} dataSource={[]} />
    </>
  );
};
export default Child;
