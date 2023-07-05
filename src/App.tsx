import React from "react";
import { ConfigProvider } from "antd";
import { BrowserRouter, } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { themeColor } from "@/store/store";
import AuthRouter from "@/components/AuthRouter"
import Router from "@/routers/index";
import zhCN from 'antd/locale/zh_CN';
import "./app.css";
function App() {
  const colorPrimary = useRecoilValue(themeColor);
  return (
    <ConfigProvider
      locale={zhCN}
      theme={{
        token: {
          colorPrimary,
        },
      }}
    >
      <BrowserRouter>
        <AuthRouter>
          <Router />
        </AuthRouter>
      </BrowserRouter>
    </ConfigProvider>
  );
}
export default App;
