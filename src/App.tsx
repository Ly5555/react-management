import React from "react";
import { ConfigProvider, theme } from "antd";
import { BrowserRouter, } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { themeColor, algorithm } from "@/store/store";
import AuthRouter from "@/components/AuthRouter"
import Router from "@/routers/index";
import zhCN from 'antd/locale/zh_CN';
import "./styles/reset.less"
import "./app.css";
function App() {
  const colorPrimary = useRecoilValue(themeColor);
  const colorAlgorithm = useRecoilValue(algorithm)
  return (
    <ConfigProvider
      locale={zhCN}
      theme={{
        algorithm:
          colorAlgorithm === 'light'
            ? theme.defaultAlgorithm
            : theme.darkAlgorithm,
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
