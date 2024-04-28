/*
 * @Author: Lyq
 * @Date: 2024-01-20 16:04:56
 * @LastEditors: Lyq
 * @LastEditTime: 2024-04-16 20:50:45
 */

import React, { memo } from "react";
import { Spin } from "antd";
import { useLoading } from "@/stores";
import styles from "./index.module.less";

const Loading = () => {
  const { loading } = useLoading();
  return (
    <div className={styles.request_loading}>
      <Spin spinning={loading} delay={500} />
    </div>
  );
};

export default memo(Loading);
