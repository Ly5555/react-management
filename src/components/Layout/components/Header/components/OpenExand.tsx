/*
 * @Author: liuyongqing
 * @Date: 2023-04-19 21:17:42
 * @LastEditors: liuyongqing
 * @LastEditTime: 2023-09-06 20:11:27
 */
import React from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { useIsExpand } from "@/store";
const OpenExand = () => {
  const { IsExpand } = useIsExpand();
  return (
    <div
      className="collapsed"
      onClick={() => {
        useIsExpand.setState({ IsExpand: !IsExpand });
      }}>
      {IsExpand ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
    </div>
  );
};
export default OpenExand;
