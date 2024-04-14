/*
 * @Author: Lyq
 * @Date: 2023-07-24 21:31:32
 * @LastEditors: Lyq
 * @LastEditTime: 2024-04-14 20:22:46
 */
import React, { useState } from "react";
import { Layout, theme } from "antd";
import { CollapseIcon, BreadcrumbNav, Theme, AvatarIcon } from "./components/index";
import styles from "./index.module.less";
import { SkinOutlined } from "@ant-design/icons";
const LayoutHeader = () => {
  const [open, setOpen] = useState(false);
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
