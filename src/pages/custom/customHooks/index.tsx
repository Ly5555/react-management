/*
 * @Author: liuyongqing
 * @Date: 2023-09-04 21:15:09
 * @LastEditors: Lyq
 * @LastEditTime: 2024-01-04 21:11:22
 */
import React, { useEffect, useRef, useState } from "react";
import { Tabs } from "antd";
import type { TabsProps } from "antd";
import { ParentSon, ChildHooks } from "./components";
import styles from "./index.module.less";
const Index = () => {
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "通行状态",
      children: <ParentSon />,
    },
    {
      key: "2",
      label: "Hooks",
      children: <ChildHooks />,
    },
  ];
  return (
    <div className={styles.customHooksBox}>
      <Tabs defaultActiveKey="1" items={items} />
    </div>
  );
};

export default Index;
