import React from "react";
import { Outlet } from "react-router-dom";
import { Layout } from "antd";
import { LayoutMenu, LayoutTabs, LayoutHeader } from "./components";
import styles from "./css/index.module.less";
import { RecoilRoot } from "recoil";
const Mylayout = () => {
  const { Header, Content, Footer, Sider } = Layout;
  return (
    <RecoilRoot>
      <section className={styles.container}>
        <Sider trigger={null}>
          <LayoutMenu />
        </Sider>
        <Layout>
          <LayoutHeader />
          <LayoutTabs />
          <Content>
            <Outlet />
          </Content>
        </Layout>
      </section>
    </RecoilRoot>
  );
};

export default Mylayout;
