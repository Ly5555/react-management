import React from "react";
import { Layout } from "antd";
import { CollapseIcon, BreadcrumbNav, Theme } from "./components/index";
import styles from "./css/header.module.less";
const LayoutHeader = () => {
  const { Header } = Layout;
  return (
    <div className={styles.header}>
      <Header>
        <div className={styles.header_lf}>
          <CollapseIcon />
          <BreadcrumbNav />
        </div>
        <div className={styles.header_ri}>
          <Theme />
          <span className={styles.username}>Hooks</span>
        </div>
      </Header>
    </div>
  );
};

export default LayoutHeader;
