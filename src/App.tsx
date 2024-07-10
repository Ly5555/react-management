/*
 * @Author: Lyq
 * @Date: 2023-08-29 21:03:53
 * @LastEditors: Lyq
 * @LastEditTime: 2024-07-01 21:07:01
 */
import React from "react";
import { ConfigProvider, App as AntdApp, theme } from "antd";
import dayjs from "dayjs";
import { BrowserRouter } from "react-router-dom";
import { useGlobalStore } from "@/stores";
import AuthRouter from "@/components/AuthRouter";
import Router from "@/routers/index";
import zhCN from "antd/locale/zh_CN";
import "dayjs/locale/zh-cn";
import "antd/dist/reset.css";
import "./app.css";

dayjs.locale("en");
function App() {
  const { darkMode, themeColor } = useGlobalStore();
  return (
    <ConfigProvider
      locale={zhCN}
      theme={{
        token: {
          colorPrimary: themeColor,
        },
        algorithm: darkMode ? theme.darkAlgorithm : undefined,
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
