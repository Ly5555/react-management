/*
 * @Author: liuyongqing
 * @Date: 2023-09-04 21:15:09
 * @LastEditors: liuyongqing
 * @LastEditTime: 2023-09-05 21:10:53
 */
import React, { useEffect, useRef, useState } from "react";
import { Tabs } from "antd";
import type { TabsProps } from "antd";
import { ParentSon, ChildHooks } from "./components";
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
    <>
      <Tabs defaultActiveKey="1" items={items} />
    </>
  );
};

export default Index;
