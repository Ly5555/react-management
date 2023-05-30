import React, {useEffect} from "react";
import dayjs from "dayjs";
import {Tabs, Table} from "antd";
import type {TabsProps} from "antd";
import styles from "./css/index.module.less";

const DataScreen = () => {
  const dataSource1:any = [
    {
      origOrderNo: "498123",
      goodsList: [
        {
          name: "测试商品",
          code: "7148724",
          unitPrice: "2",
          count: 1,
        },
        {
          name: "休闲运动包",
          code: "13024",
          unitPrice: "2",
          count: 1,
        },
      ],
      freeFlag: "开启",
    },
    {
      origOrderNo: "505775",
      goodsList: [
        {
          itemName: "测试商品",
          itemCode: "7148724",
          unitPrice: "2",
          count: 1,
        },
      ],
      freeFlag: "关闭",
    },
  ];
  const columns1:any = [
    {
      title: "姓名",
      dataIndex: "origOrderNo",
    },
    {
      title: "年龄",
      dataIndex: "goodsList",
    },
    {
      title: "住址",
      dataIndex: "freeFlag",
    },
  ];
  const dataSource = [
    {
      origOrderNo: "498123",
      goodsList: [
        {
          name: "测试商品",
          code: "7148724",
          unitPrice: "2",
          count: 1,
        },
        {
          name: "休闲运动包",
          code: "13024",
          unitPrice: "2",
          count: 1,
        },
      ],
      freeFlag: "开启",
    },
    {
      origOrderNo: "505775",
      goodsList: [
        {
          itemName: "测试商品",
          itemCode: "7148724",
          unitPrice: "2",
          count: 1,
        },
      ],
      freeFlag: "关闭",
    },
  ];
  
  const columns = [
    {
      title: "姓名",
      dataIndex: "origOrderNo",
    },
    {
      title: "年龄",
      dataIndex: "goodsList.name",
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















