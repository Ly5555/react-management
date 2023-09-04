/*
 * @Author: liuyongqing
 * @Date: 2023-04-19 21:17:42
 * @LastEditors: liuyongqing
 * @LastEditTime: 2023-09-04 19:41:20
 */
import React from "react";
import logo from "@/assets/logo.svg";
import styles from "./logo.module.less";
const LayoutLogo = () => {
  return (
    <div className={styles.logoBox}>
      <img src={logo} alt="没有找到照片" className={styles.logoImg} />
      <h3 className={styles.logoTitle}>管理后台</h3>
    </div>
  );
};

export default LayoutLogo;
