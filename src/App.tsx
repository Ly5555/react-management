import React from "react";
import { ConfigProvider } from "antd";
import zhCN from "antd/lib/locale/zh_CN";
import { MyLayout } from "@/components/index";
import { MainRouter } from "./router";
import "./app.less";
function App() {
  const menu = MainRouter.filter((item) => item.isNav === true);
  return (
    <ConfigProvider locale={zhCN}>
      <MyLayout menu={menu}/>
    </ConfigProvider>
  );
}
export default App;
