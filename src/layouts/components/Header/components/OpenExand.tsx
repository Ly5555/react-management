/*
 * @Author: Lyq
 * @Date: 2023-04-19 21:17:42
 * @LastEditors: Lyq
 * @LastEditTime: 2023-12-07 21:05:15
 */
import React from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { useGlobalStore } from "@/stores";

const OpenExand = () => {
  const { collapsed } = useGlobalStore();
  return (
    <div
      className="collapsed"
      onClick={() => {
        useGlobalStore.setState({ collapsed: !collapsed });
      }}>
      {collapsed ? <MenuUnfoldOutlined id="isCollapse" /> : <MenuFoldOutlined id="isCollapse" />}
    </div>
  );
};
export default OpenExand;
