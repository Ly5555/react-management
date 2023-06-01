import React, {  useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Layout } from "antd";
import { LayoutMenu, LayoutTabs, LayoutHeader } from "./components";
import { useRecoilState } from "recoil";
import { IsExpand } from "@/store/store";
import styles from "./css/index.module.less";
const LayoutIndex = () => {
  const { Content, Footer, Sider } = Layout;
  const [isExpandMenu, setIsExpandMenu] = useRecoilState(IsExpand);
  useEffect(() => {
    listeningWindow();
  }, []);
  // 监听窗口大小变化
  const listeningWindow = () => {
    window.onresize = () => {
      return (() => {
        let screenWidth = document.body.clientWidth;
        if (!isExpandMenu && screenWidth < 1200) setIsExpandMenu(true);
        if (!isExpandMenu && screenWidth > 1200) setIsExpandMenu(false);
      })();
    };
  };
  return (
        <Layout className={styles.container}>
          <Sider trigger={null} collapsed={isExpandMenu}>
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
