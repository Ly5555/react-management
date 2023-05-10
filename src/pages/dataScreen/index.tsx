import React, {useEffect} from "react";
import dayjs from "dayjs";
import {Tabs, Table} from "antd";
import type {TabsProps} from "antd";
import styles from "./css/index.module.less";
import {render} from "react-dom";
function name() {
  // if (!rowspanArray.includes(item.key)) {
  //   if (row.len > 0 && row.index === 0) {
  //     return {
  //       children,
  //       props: {
  //         rowSpan: row.len,
  //       },
  //     };
  //   } else {
  //     return {
  //       children,
  //       props: {
  //         rowSpan: 0,
  //       },
  //     };
  //   }
  // } else {
  //   return {
  //     children,
  //   };
  // }
}
const DataScreen = () => {
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: `近七日`,
      children: `Content of Tab Pane 1`,
    },
    {
      key: "2",
      label: `近一月`,
      children: `Content of Tab Pane 2`,
    },
    {
      key: "3",
      label: `近三月`,
      children: `Content of Tab Pane 3`,
    },
  ];
  const handeleChange = (key: string) => {
    const lastSecond = dayjs().subtract(7, "day").startOf("day").valueOf();
    const TodaySecond = dayjs().endOf("day").valueOf();
    console.log(lastSecond, TodaySecond, "28");
  };
  const dataSource = [
    {
      origOrderNo: "498123",
      goodsList: [
        {
          itemName: "测试商品",
          itemCode: "7148724",
          unitPrice: "2",
          count: 1,
        },
        {
          itemName: "休闲运动包",
          itemCode: "13024",
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
  ];
  const rowSpanAble = (rowspanKey: string, rowspanArray: any) => {
    console.log(rowspanKey);
    
    let columns = rowspanArray.map((item: any) => {
      let column = {
        render: (text: any, row: any, index: any): any => {
          const children = text;
          if (!rowspanArray.includes(item.key)) {
            if (row.len > 0 && row.index === 0) {
              return {
                children,
                props: {
                  rowSpan: row.len,
                },
              };
            } else {
              return {
                children,
                props: {
                  rowSpan: 0,
                },
              };
            }
          } else {
            return {
              children,
            };
          }
        },
      };
      return column;
    });
    return columns;
  };
  rowSpanAble("goodsList",[])
  return (
    <div className={styles.dataScreen}>
      <div className={styles.dataScreen_h2}>数据可视化</div>
      {/* <Table dataSource={dataSource} columns={columns} size='small' bordered /> */}
      {/* <Tabs items={items} onChange={handeleChange} /> */}
    </div>
  );
};
export default DataScreen;
const rowSpanTable = ({dataScreen = [], columns = []}) => {};
