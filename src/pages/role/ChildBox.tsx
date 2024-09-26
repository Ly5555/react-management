/*
 * @Author: Lyq
 * @Date: 2024-03-25 21:36:18
 * @LastEditors: Lyq
 * @LastEditTime: 2024-04-02 21:42:59
 */
//@ts-nocheck
import React, { useEffect, useState } from "react";
import { Table, Button, Checkbox } from "antd";
import { Length } from "class-validator";
import styles from "./childBox.module.less";
const Child = (props) => {
  const { dataList, data2 } = props;
  // 处理数据
  const encodeData = (data, depth = 0, parentData = {}) => {
    let result = [];
    data?.forEach((item) => {
      let currentData = {
        ...parentData,
        [depth]: item.permission_id,
        key: item.permission_id,
        buttons: item.buttons,
      };
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
  const generateData = (list) => {
    const dataSource = encodeData(list);
    const maxDepth = getMaxDepth(list);
    const columns = [];
    for (let columnIndex = 0; columnIndex < maxDepth; columnIndex++) {
      columns.push({
        key: columnIndex,
        dataIndex: columnIndex,
        title:
          columnIndex <= 2
            ? `${columnIndex === 0 ? "一级" : columnIndex === 1 ? "二级" : "三级"}菜单`
            : "按钮",
        render: (text) => (
          <span style={{ display: "table-cell", verticalAlign: "middle" }}>
            {text ? getCheckBox(text, list) : ""}
          </span>
        ),
        onCell: (record, rowIndex) => {
          let obj = { rowSpan: 0 };
          //行合并
          if (
            dataSource[rowIndex - 1] &&
            dataSource[rowIndex - 1][columnIndex] === dataSource[rowIndex][columnIndex]
          ) {
            obj.rowSpan = 0;
          } else {
            let rowSpan = 1;
            for (
              let j = 1;
              dataSource[rowIndex + j] &&
              dataSource[rowIndex + j][columnIndex] === dataSource[rowIndex][columnIndex];
              j++
            ) {
              rowSpan++;
            }
            obj.rowSpan = rowSpan;
          }
          return obj;
        },
      });
    }
    return columns;
  };

  const getCheckBox = (record, data) => {
    let obj = {};
    return <Checkbox onChange={handleChecked}>123</Checkbox>;
  };
  const handleChecked = (e) => {
    const isChecked = e.target.checked;
  };

  const mapData = (obj, id, list) => {
    list.map((item) => {
      //如果id相等，则把整个对象赋给ogj,否则如果有子数据就递归
      if (item.permission_id === id) {
        obj = item;
      } else if (item.children) {
        obj = mapData(obj, id, item.children);
      }
    });
    //最后将对象返回
    return obj;
  };
  console.log(encodeData(dataList));

  return (
    <div className={styles.childBox}>
      <Button type="primary" style={{ marginBottom: 8 }}>
        保存
      </Button>
      <Table
        columns={generateData(dataList)}
        bordered
        rowKey={(record) => record.key}
        size="small"
        pagination={false}
        dataSource={encodeData(dataList)}
      />
    </div>
  );
};
export default Child;
