/*
 * @Author: Lyq
 * @Date: 2023-07-24 21:31:32
 * @LastEditors: Lyq
 * @LastEditTime: 2024-01-25 20:36:40
 */
import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { Button, Layout, theme } from "antd";
import { LayoutMenu, LayoutTabs, LayoutHeader } from "./components";
import { useGlobalStore } from "@/stores";
import styles from "./index.module.less";
const LayoutIndex = () => {
  const { Content, Footer, Sider } = Layout;
  const { collapsed } = useGlobalStore();
  useEffect(() => {
    listeningWindow();
  }, []);
  // 监听窗口大小变化
  const listeningWindow = () => {
    window.onresize = () => {
      return (() => {
        let screenWidth = document.body.clientWidth;
        if (!collapsed && screenWidth < 1200) useGlobalStore.setState({ collapsed: true });
        if (!collapsed && screenWidth > 1200) useGlobalStore.setState({ collapsed: false });
      })();
    };
  };

  return (
    <Layout className={styles.container}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
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
