/*
 * @Author: liuyongqing
 * @Date: 2023-11-16 22:28:43
 * @LastEditors: Lyq
 * @LastEditTime: 2024-01-31 21:59:08
 */
//登陆页
import React from "react";
import { LoginForm } from "./components";
import { SwitchTheme } from "@/components";
import styles from "./index.module.less";
// https://gjq0208.gitee.io/react-antd-admin/images/login.1356e663679d4a0ec4482ed445ff33d4.png
const LoginPage = () => {
  return (
    <div className={styles.login}>
      <div className={styles.login_box}>
        <div className={styles.login_header}>
          <SwitchTheme />
        </div>
        <div className={styles.login_container}>
          <div className={styles.left_container}>
            <div className={styles.left_logo}>
              <div className={styles.left_logo_title}>运营平台</div>
              <div className={styles.left_logo_tip}>Xxxxxxxxxx</div>
            </div>
          </div>
          <div className={styles.right_container}>
            {/* <div className={styles.logo} /> */}
            <div className={styles.logo_tip}>Welcome back</div>
            <div className={styles.logo_desc}>Sign in to continue</div>
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
