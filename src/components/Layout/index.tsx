import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { Layout } from "antd";
import { LayoutMenu, LayoutTabs, LayoutHeader } from "./components";
import { RecoilRoot } from "recoil";
import styles from './css/index.module.less'
const Mylayout = () => {
  const {  Content, Footer, Sider } = Layout;
  return (
    <Suspense>
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
    </Suspense>
  );
};

export default Mylayout;
