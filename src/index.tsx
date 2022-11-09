import React from "react";
import { ConfigProvider } from "antd";
import { createRoot } from "react-dom/client";
import zhCN from "antd/lib/locale/zh_CN";
import { HashRouter as Router } from "react-router-dom";
import App from "./App";
const root = document.getElementById("root");
if (root) {
  createRoot(root).render(
    <Router>
      <ConfigProvider locale={zhCN}>
        <App />
      </ConfigProvider>
    </Router>
  );
}
