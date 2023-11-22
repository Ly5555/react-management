/*
 * @Author: liuyongqing
 * @Date: 2023-04-19 21:17:42
 * @LastEditors: liuyongqing
 * @LastEditTime: 2023-11-22 21:14:48
 */
import React from "react";
import logo from "@/assets/logo.svg";
import { useGlobalStore } from "@/stores";
import styles from "./logo.module.less";
const LayoutLogo = () => {
  const { collapsed } = useGlobalStore();
  return (
    <div className={styles.logoBox}>
      <img src={logo} alt="没有找到照片" className={styles.logoImg} />
      {!collapsed && <span className={styles.logoTitle}>管理后台</span>}
    </div>
  );
};

export default LayoutLogo;
