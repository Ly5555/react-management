/*
 * @Author: liuyongqing
 * @Date: 2023-07-24 21:31:32
 * @LastEditors: liuyongqing
 * @LastEditTime: 2023-08-17 21:45:26
 * @FilePath: /个人/react-webpack-ts/src/components/Layout/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Layout } from "antd";
import { LayoutMenu, LayoutTabs, LayoutHeader } from "./components";
import { useRecoilState } from "recoil";
import { IsExpand } from "@/store/store";
import styles from "./index.module.less";
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
