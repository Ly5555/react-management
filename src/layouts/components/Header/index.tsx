/*
 * @Author: Lyq
 * @Date: 2023-07-24 21:31:32
 * @LastEditors: Lyq
 * @LastEditTime: 2024-07-10 21:23:03
 */
import React, { useState } from "react";
import { Layout, theme } from "antd";
import { CollapseIcon, BreadcrumbNav, Theme, AvatarIcon } from "./components/index";
import styles from "./index.module.less";
const LayoutHeader = () => {
  const { Header } = Layout;
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Header className={styles.header} style={{ background: colorBgContainer }}>
      <div className={styles.header_lf}>
        <CollapseIcon />
        <BreadcrumbNav />
      </div>
      <div className={styles.header_ri}>
        <Theme />
        <AvatarIcon />
      </div>
    </Header>
  );
};

export default LayoutHeader;
