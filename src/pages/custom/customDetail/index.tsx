/*
 * @Author: liuyongqing
 * @Date: 2023-12-11 20:18:03
 * @LastEditors: Lyq
 * @LastEditTime: 2024-01-29 20:16:52
 */
import React from "react";
import { TourModal } from "@/components";
import styles from "./index.module.less";
const index = () => {
  return (
    <div className={styles.customDetailBox}>
      <h1>新人指导</h1>
      <TourModal />
    </div>
  );
};

export default index;
