/*
 * @Author: liuyongqing
 * @Date: 2023-08-29 21:03:53
 * @LastEditors: liuyongqing
 * @LastEditTime: 2023-11-21 19:59:58
 */
import React from "react";
import { ConfigProvider, theme } from "antd";
import { BrowserRouter } from "react-router-dom";
import { useThemeColor } from "@/stores";
import AuthRouter from "@/components/AuthRouter";
import Router from "@/routers/index";
import zhCN from "antd/locale/zh_CN";
import "./styles/reset.less";
import "./app.css";

function App() {
  const { themeColor } = useThemeColor();
  return (
    <ConfigProvider
      locale={zhCN}
      theme={{
        //algorithm: theme.darkAlgorithm,
        token: {
          colorPrimary: themeColor,
        },
      }}>
      <BrowserRouter>
        <AuthRouter>
          <Router />
        </AuthRouter>
      </BrowserRouter>
    </ConfigProvider>
  );
}
export default App;
