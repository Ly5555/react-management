/*
 * @Author: Lyq
 * @Date: 2024-01-20 16:04:56
 * @LastEditors: Lyq
 * @LastEditTime: 2024-04-08 21:58:54
 */
import React from "react";
import ReactDOM from "react-dom/client";
import Loading from "@/components/Loading";

let needLoadingRequestCount = 0;

// * 显示loading
export const showFullScreenLoading = () => {
  if (needLoadingRequestCount === 0) {
    let dom = document.createElement("div");
    dom.setAttribute("id", "loading");
    document.body.appendChild(dom);
    ReactDOM.createRoot(dom).render(<Loading />);
  }
  needLoadingRequestCount++;
};

// * 隐藏loading
export const tryHideFullScreenLoading = () => {
  if (needLoadingRequestCount <= 0) return;
  needLoadingRequestCount--;
  if (needLoadingRequestCount === 0) {
    document.body.removeChild(document.getElementById("loading") as HTMLElement);
  }
};
