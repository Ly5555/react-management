import React, { useEffect } from "react";
import dayjs from "dayjs";
import { Tabs, Table } from "antd";
import type { TabsProps } from "antd";
import styles from "./css/index.module.less";

const DataScreen = () => {
  const dataSource = [
    {
      name: "home",
      age: "12",
      freeFlag: "开启",
    },
    {
      name: "home",
      age: "22",
      freeFlag: "关闭",
    },
  ];
  const getRowSpan = (text: any, record: any, index: any, data: any, dataIndex: any) => {
    const count = {} as any
    data.forEach(item => {
      const key = item[dataIndex]
      if (count.hasOwnProperty(key)) {
        count[key]++
      } else {
        count[key] = 1
      }
    })
    const rowSpan = count[text]
    if (index > 0 && record[dataIndex] === data[index - 1][dataIndex]) {
      return 0
    } else {
      return rowSpan
    }
  }
  const columns = [
    {
      title: "姓名",
      dataIndex: "name",
      onCell: (text: any, record: any, index: any) => {
        const isFirstRow = index === 0; // 判断是否是第一行
        const rowSpan = isFirstRow ? 2 : 0; // 合并两行
        return {
          children: text,
          props: {
            rowSpan: rowSpan,
          },
        };
      }
    },
    {
      title: "年龄",
      dataIndex: "age",
    },
    {
      title: "住址",
      dataIndex: "freeFlag",
    },
  ];

  return (
    <div className={styles.dataScreen}>
      <div className={styles.dataScreen_h2}>数据可视化</div>
      <Table dataSource={dataSource} columns={columns} size="small" bordered />
    </div>
  );
};
export default DataScreen;















