/*
 * @Author: Lyq
 * @Date: 2024-03-25 21:36:18
 * @LastEditors: Lyq
 * @LastEditTime: 2024-03-26 22:30:50
 */
//@ts-nocheck
import React, { useEffect, useState } from "react";
import { Table, Button } from "antd";
const Child = (props) => {
  const { dataList } = props;
  const [columns, setColumns] = useState([]);
  // 处理数据
  const encodeData = (data, depth = 0, parentData = {}) => {
    let result = [];
    data?.forEach((item) => {
      let currentData = { ...parentData, [depth]: item.permission_id };
      if (!item?.children) return result.push(currentData);
      result.push(...encodeData(item.children, depth + 1, currentData));
    });
    return result;
  };
  const getMaxDepth = (data) => {
    let max = 1;
    data?.map((item) => {
      if (item.children) {
        let childDepth = getMaxDepth(item.children);
        if (max < 1 + childDepth) max = 1 + childDepth;
      }
    });
    return max;
  };
  // 处理成 antd table 想要的格式
  const generateData = (list) => {
    const dataSource = encodeData(list);
    //最大深度, 用于确认表格列数
    const max = getMaxDepth(list);
    const columns = [];
    for (let i = 0; i < max; i++) {
      columns.push({
        key: i,
        dataIndex: i,
        title: i,
        render: (t, r, rowIndex) => {
          const obj = {
            children: t ? getCheckBox(t, list) : "",
            props: {},
          };
          //列合并
          if (r[i] === undefined) {
            obj.props.colSpan = 0;
          } else if (r[i + 1] === undefined && i < max - 1) {
            obj.props.colSpan = max - i;
          }
          //行合并
          if (dataSource[rowIndex - 1] && dataSource[rowIndex - 1][i] === dataSource[rowIndex][i]) {
            obj.props.rowSpan = 0;
          } else {
            let rowSpan = 1;
            for (
              let j = 1;
              dataSource[rowIndex + j] && dataSource[rowIndex + j][i] === dataSource[rowIndex][i];
              j++
            ) {
              rowSpan++;
            }
            obj.props.rowSpan = rowSpan;
          }
          return obj;
        },
      });
    }
    return columns;
  };

  return (
    <>
      <Button type="primary">保存2</Button>
      <Table
        columns={generateData(dataList)}
        bordbordered
        size="small"
        ered
        pagination={false}
        dataSource={generateData(dataList)}
      />
    </>
  );
};
export default Child;
