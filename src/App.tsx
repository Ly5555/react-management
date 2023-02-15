import React, { Suspense } from "react";
import { ConfigProvider } from "antd";
import { BrowserRouter } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { themeColor } from "@/store/store";
import { Loading } from "./components/index";
import Router from "@/router";
// import "@/styles/reset.module.less";
import "./app.css";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
function App() {
  const colorPrimary = useRecoilValue(themeColor);
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary,
        },
      }}
    >
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </ConfigProvider>
  );
}
export default App;
