/*
 * @Author: Lyq
 * @Date: 2024-01-06 20:49:24
 * @LastEditors: Lyq
 * @LastEditTime: 2024-01-06 21:27:18
 */
import React from "react";
import { Table } from "antd";

const BasicTable = (props: any) => {
  const {} = props || {};

  return (
    <div>
      <Table dataSource={[]} columns={[]} />
    </div>
  );
};

export default BasicTable;
