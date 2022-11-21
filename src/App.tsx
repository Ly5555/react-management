import React, { lazy, Suspense, useState } from "react";
import { ConfigProvider } from "antd";
import Recoil from "@/pages/recoil/index";
import "./app.less";
import { MainRouter } from "./router";
import { MyLayout } from "@/components/index";
// 获取导航菜单
const menu = MainRouter.filter((route: any) => route.isNav === true);
function App() {
  return (
    <ConfigProvider>
      <MyLayout menu={menu} />
    </ConfigProvider>
  );
}
export default App;
