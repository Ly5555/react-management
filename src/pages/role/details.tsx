/*
 * @Author: Lyq
 * @Date: 2024-03-08 21:23:44
 * @LastEditors: Lyq
 * @LastEditTime: 2024-03-27 22:24:31
 */
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Checkbox } from "antd";
import Child from "./ChildBox";
import styles from "./details.module.less";

const CheckboxGroup = Checkbox.Group;
const Details = () => {
  const [params] = useSearchParams();
  const id = params.get("id");
  const title = params.get("title");

  const [data, stedata] = useState([
    {
      IsObtain: false,
      halfchecked: false,
      permission_id: "1",
      permission_name: "权限1",
      permission_pid: null,
      children: [
        {
          IsObtain: false,
          halfchecked: false,
          permission_id: "1-1",
          permission_name: "权限1-1",
          permission_pid: "1",
          children: [
            {
              IsObtain: false,
              halfchecked: false,
              permission_id: "1-1-1",
              permission_name: "权限1-1-1",
              permission_pid: "1-1",
              buttons: [],
              children: [
                {
                  IsObtain: false,
                  halfchecked: false,
                  permission_id: "1-1-1-1",
                  permission_name: "权限1-1-1-1",
                  permission_pid: "1-1-1",
                  children: null,
                },
                {
                  IsObtain: false,
                  halfchecked: false,
                  permission_id: "1-1-1-2",
                  permission_name: "权限1-1-1-2",
                  permission_pid: "1-1-1",
                  children: null,
                },
              ],
            },
            {
              IsObtain: false,
              halfchecked: false,
              permission_id: "1-1-2",
              permission_name: "权限1-1-2",
              permission_pid: "1-1",
              children: null,
            },
          ],
        },
        {
          IsObtain: false,
          halfchecked: false,
          permission_id: "1-2",
          permission_name: "权限1-2",
          permission_pid: "1",
          children: [
            {
              IsObtain: false,
              halfchecked: false,
              permission_id: "1-2-1",
              permission_name: "权限1-2-1",
              permission_pid: "1-2",
              children: null,
            },
          ],
        },
      ],
    },
    {
      IsObtain: false,
      halfchecked: false,
      permission_id: "2",
      permission_name: "权限2",
      permission_pid: null,
      children: [
        {
          IsObtain: false,
          halfchecked: false,
          permission_id: "2-1",
          permission_name: "权限2-1",
          permission_pid: "2",
          children: [
            {
              IsObtain: false,
              halfchecked: false,
              permission_id: "2-1-1",
              permission_name: "权限2-1-1",
              permission_pid: "2-1",
              children: null,
            },
            {
              IsObtain: false,
              halfchecked: false,
              permission_id: "2-1-2",
              permission_name: "权限1-1-2",
              permission_pid: "2-1",
              children: null,
            },
          ],
        },
      ],
    },
  ]);
  const data2 = [
    {
      icon: "HomeOutlined",
      title: "首页",
      id: 1,
      buttons: [{ id: 11 }, { id: 12 }],
    },
    {
      icon: "HomeOutlined",
      title: "轮播图",
      buttons: [],
      id: 2,
    },
    {
      title: "测试目录",
      buttons: [],
      id: 3,
      children: [
        {
          buttons: [],
          title: "自定义hooks",
          id: 31,
        },
        {
          buttons: [],
          title: "详情页",
          id: 32,
        },
      ],
    },

    {
      buttons: [],
      title: "表单Table",
      id: 4,
    },
    {
      id: 5,
      title: "数据大屏",
      buttons: [],
    },
  ];
  return (
    <div className={styles.roleDetailsBox}>
      <Child dataList={data} data2={data2} setdataList={stedata} />
    </div>
  );
};

export default Details;
