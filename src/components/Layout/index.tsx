/*
 * @Author: liuyongqing
 * @Date: 2023-07-24 21:31:32
 * @LastEditors: liuyongqing
 * @LastEditTime: 2023-09-06 20:11:25
 */
import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Layout } from "antd";
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
        if (!IsExpand && screenWidth < 1200) useIsExpand.setState({ IsExpand: true });
        if (!IsExpand && screenWidth > 1200) useIsExpand.setState({ IsExpand: false });
      })();
    };
  };
  return (
    <Layout className={styles.container}>
      <Sider trigger={null} collapsed={IsExpand}>
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
