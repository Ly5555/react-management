/*
 * @Author: Lyq
 * @Date: 2023-04-19 21:17:42
 * @LastEditors: Lyq
 * @LastEditTime: 2023-12-11 20:31:50
 */
import React from "react";
import logo from "@/assets/logo.svg";
import { useGlobalStore } from "@/stores";
import styles from "./logo.module.less";
const LayoutLogo = () => {
  const { collapsed } = useGlobalStore();
  return (
    <div className={styles.logoBox} id="drive_layout">
      <img src={logo} alt="没有找到照片" className={styles.logoImg} />
      {!collapsed && <span className={styles.logoTitle}>管理后台</span>}
    </div>
  );
};

export default LayoutLogo;
