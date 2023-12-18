/*
 * @Author: liuyongqing
 * @Date: 2023-07-24 21:31:32
 * @LastEditors: liuyongqing
 * @LastEditTime: 2023-12-14 20:53:11
 */
import React from "react";
import { Layout, theme } from "antd";
import { CollapseIcon, BreadcrumbNav, Theme, AvatarIcon } from "./components/index";
import styles from "./index.module.less";
const LayoutHeader = () => {
  const { Header } = Layout;
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Header style={{ background: colorBgContainer }}>
      <div className={styles.header}>
        <div className={styles.header_lf}>
          <CollapseIcon />
          <BreadcrumbNav />
        </div>
        <div className={styles.header_ri}>
          <Theme />
          <AvatarIcon />
        </div>
      </div>
    </Header>
  );
};

export default LayoutHeader;
