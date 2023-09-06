/*
 * @Author: liuyongqing
 * @Date: 2023-08-29 21:03:53
 * @LastEditors: liuyongqing 
 * @LastEditTime: 2023-09-06 20:11:19
 */
import React from "react";
import { ConfigProvider } from "antd";
import { BrowserRouter } from "react-router-dom";
import { useThemeColor } from "@/store";
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
        token: {
          colorPrimary: themeColor,
        },
      }}>
      <BrowserRouter>
        {/* <AuthRouter> */}
        <Router />
        {/* </AuthRouter> */}
      </BrowserRouter>
    </ConfigProvider>
  );
}
export default App;
