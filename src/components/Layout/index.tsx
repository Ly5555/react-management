/*
 * @Author: liuyongqing
 * @Date: 2023-07-24 21:31:32
 * @LastEditors: liuyongqing
 * @LastEditTime: 2023-10-31 21:45:37
 */
import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { Button, Layout, Menu, theme } from "antd";
import { LayoutMenu, LayoutTabs, LayoutHeader } from "./components";
import { useIsExpand } from "@/store";
import styles from "./index.module.less";
const LayoutIndex = () => {
  const { Content, Footer, Sider } = Layout;
  const { IsExpand } = useIsExpand();
  useEffect(() => {
    listeningWindow();
  }, []);
  // 监听窗口大小变化
  const listeningWindow = () => {
    window.onresize = () => {
      return (() => {
        let screenWidth = document.body.clientWidth;
        if (!IsExpand && screenWidth < 1200) useIsExpand.setState({ IsExpand: false });
        if (!IsExpand && screenWidth > 1200) useIsExpand.setState({ IsExpand: true });
      })();
    };
  };

  return (
    <Layout className={styles.container}>
      <Sider trigger={null} collapsible collapsed={!IsExpand}>
        <LayoutMenu />
      </Sider>
      <Layout>
        <LayoutHeader />
        <LayoutTabs />
        <Content>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default LayoutIndex;
