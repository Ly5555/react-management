/*
 * @Author: liuyongqing
 * @Date: 2023-09-06 19:51:49
 * @LastEditors: liuyongqing
 * @LastEditTime: 2023-09-06 20:11:00
 */
import React from "react";
import { createRoot } from "react-dom/client";

import App from "./App";
const root = document.getElementById("root");
if (root) {
  createRoot(root).render(<App />);
}
