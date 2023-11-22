/*
 * @Author: liuyongqing
 * @Date: 2023-11-16 22:28:43
 * @LastEditors: liuyongqing
 * @LastEditTime: 2023-11-22 20:13:15
 */
//登陆页
import React from "react";
import { LoginForm } from "./components";
import styles from "./css/index.module.less";
const LoginPage = () => {
  return (
    <div className={styles.login}>
      <div className={styles.login_container}>
        <div className={styles.left_container}>
          <div className={styles.left_logo}>
            <div className={styles.left_logo_title}>运营平台</div>
            <div className={styles.left_logo_tip}>Xxxxxxxxxx</div>
          </div>
        </div>
        <div className={styles.right_container}>
          <div className={styles.logo} />
          <div className={styles.logo_tip}>Welcome back</div>
          <div className={styles.logo_desc}>Sign in to continue</div>
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
