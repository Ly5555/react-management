/*
 * @Author: Lyq
 * @Date: 2024-01-20 16:04:56
 * @LastEditors: Lyq
 * @LastEditTime: 2024-04-15 22:08:38
 */
import React, { Suspense } from "react";
import Loading from "@/components/Loading";

/**
 * @description 路由懒加载
 * @param {Element} Comp 需要访问的组件
 * @returns element
 */
const lazyLoad = (Comp: any) => {
  return (
    <Suspense fallback={<Loading />}>
      <Comp />
    </Suspense>
  );
};

export default lazyLoad;
