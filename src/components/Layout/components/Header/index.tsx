/*
 * @Author: liuyongqing
 * @Date: 2023-07-24 21:31:32
 * @LastEditors: liuyongqing
 * @LastEditTime: 2023-11-01 15:27:30
 */
import React from "react";
import { Layout } from "antd";
import { CollapseIcon, BreadcrumbNav, Theme, AvatarIcon } from "./components/index";
import styles from "./header.module.less";
const LayoutHeader = () => {
  const { Header } = Layout;
  return (
    <Header className={styles.header}>
      <div className={styles.header_lf}>
        <CollapseIcon />
        <BreadcrumbNav />
      </div>
      <div className={styles.header_ri}>
        <Theme />
        <AvatarIcon />
        {/* <span className={styles.username}>Hooks</span> */}
      </div>
    </Header>
  );
};

export default LayoutHeader;
