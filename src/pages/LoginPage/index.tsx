//登陆页
import React from "react";
import { LoginForm } from "./components";
import styles from "./css/index.module.less";
import { TypedText } from "@/components";
const LoginPage = () => {
  return (
    <div className={styles.login_container}>
      <div></div>
      <div className={styles.login_card}>
      <TypedText >Cool! Hi, React & Ant Design!</TypedText>
      <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
