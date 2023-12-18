/*
 * @Author: liuyongqing
 * @Date: 2023-08-29 21:03:53
 * @LastEditors: liuyongqing
 * @LastEditTime: 2023-12-18 21:09:42
 */
import React from "react";
import { ConfigProvider, App as AntdApp, theme } from "antd";
import { BrowserRouter } from "react-router-dom";
import { useGlobalStore, useThemeColor } from "@/stores";
import AuthRouter from "@/components/AuthRouter";
import Router from "@/routers/index";
import zhCN from "antd/locale/zh_CN";
import "antd/dist/reset.css";
import "./app.css";

function App() {
  const { themeColor } = useThemeColor();
  const { darkMode } = useGlobalStore();
  return (
    <ConfigProvider
      locale={zhCN}
      theme={{
        algorithm: darkMode ? theme.defaultAlgorithm : theme.darkAlgorithm,
        token: {
          colorPrimary: themeColor,
        },
      }}>
      <AntdApp>
        <BrowserRouter>
          <AuthRouter>
            <Router />
          </AuthRouter>
        </BrowserRouter>
      </AntdApp>
    </ConfigProvider>
  );
}
export default App;
