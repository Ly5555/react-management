import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import {  Layout} from "antd";
import LayoutMenu from "./Menu";
import LayoutTabs from "./Tabs/index";
import "@/components/css/mylayout.less";
import styles from "./css/index.module.less";
const Mylayout = () => {
  const { Header, Content, Footer, Sider } = Layout;
  return (
    <section className={styles.container}>
      <Sider trigger={null}>
        <LayoutMenu />
      </Sider>
      <Layout>
        <Header />
        <LayoutTabs />
        <Content style={{ margin: "16px" }}>
          <Outlet />
        </Content>
      </Layout>
    </section>
  );
};

export default Mylayout;
