/*
 * @Author: Lyq
 * @Date: 2023-09-06 19:51:49
 * @LastEditors: Lyq
 * @LastEditTime: 2024-01-22 22:01:58
 */
import React from "react";
import { createRoot } from "react-dom/client";

import App from "./App";

const root = document.getElementById("root");
if (root) {
  createRoot(root).render(<App />);
}
