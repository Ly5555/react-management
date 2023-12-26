/*
 * @Author: liuyongqing
 * @Date: 2023-08-29 21:03:53
 * @LastEditors: liuyongqing
 * @LastEditTime: 2023-12-26 21:12:08
 */
import React from "react";
import { ConfigProvider, App as AntdApp, theme } from "antd";
import dayjs from "dayjs";
import { BrowserRouter } from "react-router-dom";
import { useGlobalStore, useThemeColor } from "@/stores";
import AuthRouter from "@/components/AuthRouter";
import Router from "@/routers/index";
import zhCN from "antd/locale/zh_CN";
import "dayjs/locale/zh-cn";
import "antd/dist/reset.css";
import "./app.css";

dayjs.locale("en");
function App() {
  const { themeColor } = useThemeColor();
  const { darkMode } = useGlobalStore();
  return (
    <ConfigProvider
      locale={zhCN}
      theme={{
        algorithm: [darkMode ? theme.darkAlgorithm : theme.defaultAlgorithm],
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
