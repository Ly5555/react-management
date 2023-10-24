/*
 * @Author: liuyongqing
 * @Date: 2023-04-19 21:17:42
 * @LastEditors: liuyongqing
 * @LastEditTime: 2023-10-24 21:31:58
 */
import React from "react";
import logo from "@/assets/logo.svg";
import { useIsExpand } from "@/store";
import styles from "./logo.module.less";
const LayoutLogo = () => {
  const { IsExpand } = useIsExpand();
  return (
    <div className={styles.logoBox}>
      <img src={logo} alt="没有找到照片" className={styles.logoImg} />
      {IsExpand && <span className={styles.logoTitle}>管理后台</span>}
    </div>
  );
};

export default LayoutLogo;
