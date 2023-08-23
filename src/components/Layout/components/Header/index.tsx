/*
 * @Author: liuyongqing
 * @Date: 2023-07-24 21:31:32
 * @LastEditors: liuyongqing
 * @LastEditTime: 2023-08-17 21:42:13
 * @FilePath: /个人/react-webpack-ts/src/components/Layout/components/Header/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React from "react";
import { Layout } from "antd";
import { CollapseIcon, BreadcrumbNav, Theme, AvatarIcon } from "./components/index";
import styles from "./header.module.less";
const LayoutHeader = () => {
  const { Header } = Layout;
  return (
    <>
      <div className={styles.header}>
        <Header>
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
      </div>
    </>
  );
};

export default LayoutHeader;
