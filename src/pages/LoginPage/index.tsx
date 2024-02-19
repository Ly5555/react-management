/*
 * @Author: liuyongqing
 * @Date: 2023-11-16 22:28:43
 * @LastEditors: Lyq
 * @LastEditTime: 2024-02-19 21:45:47
 */
//登陆页
import React from "react";
import { LoginForm } from "./components";
import { SwitchTheme } from "@/components";
import styles from "./index.module.less";

import HOME_BG from "@/assets/home_bg.png";

const LoginPage = () => {
  return (
    <div className={styles.login}>
      <div className={styles.login_box}>
        <div className={styles.login_header}>
          <SwitchTheme />
        </div>
        <div className={styles.login_container}>
          <div className={styles.left_container}>
            <p className={styles.left_h3}>注册账号 - 成为XXXX实名用户</p>
            <p className={styles.left_title}>即可同步开通相关业务</p>
            <p className={styles.left_title_tip}>智能小程序平台 · 百家号平台 · 搜索资源平台 · 商家号 · 数据开发平台</p>
            <img className={styles.left_Image} src={HOME_BG} alt="我是HOME_BG" />
          </div>
          <div className={styles.right_container}>
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
