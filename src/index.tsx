import React from "react";
import { ConfigProvider } from 'antd';
import { createRoot } from "react-dom/client";
import App from "./App";
const root = document.getElementById("root");
if (root) {
  createRoot(root).render( 
  <ConfigProvider>
     <App />
  </ConfigProvider>
 );
}
