import React, { lazy } from "react";
import lazyLoad from "@/components/lazyLoad"
import { Navigate, useRoutes } from "react-router-dom";

// 页面组件
// const LoginPage = lazyLoad(lazy(() => import("@/pages/LoginPage")));
import LoginPage from "@/pages/LoginPage"
const LayoutIndex = lazyLoad(lazy(() => import("@/components/Layout")));
const Home = lazyLoad(lazy(() => import("@/pages/home")));
const LazyDemo = lazyLoad(lazy(() => import("@/pages/javascripct/LazyDemo")));
const CarouselChart = lazyLoad(lazy(() => import("@/pages/carouselChart")));
const TypeScripct = lazyLoad(lazy(() => import("@/pages/TypeScripct")));
const DataScreen = lazyLoad(lazy(() => import("@/pages/dataScreen")));
const NotFound = lazyLoad(lazy(() => import("@/pages/NotFound/index")));

// 页面组件
export const rootRouter: any = [
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/",
    element: LayoutIndex,
    children: [
      {
        path: "/home",
        title: "首页",

        children: [
          {
            path: "/home/home",
            element: Home,
            title: "首页",
            meta: { requiresAuth: true, },
          },
          {
            path: "/home/carouselChart",
            element: CarouselChart,
            title: "轮播图",
            meta: { requiresAuth: true, },
          },
        ],
      },
      {
        path: "/demo2",
        title: "测试22",
        children: [
          {
            path: "/demo2/lear",
            meta: { requiresAuth: true, },
            element: LazyDemo,
            title: "js学习",
          },
          {
            path: "/demo2/TypeScripct",
            meta: { requiresAuth: true, },
            element: TypeScripct,
            title: "TypeScripct",
          },
        ],
      },
      {
        path: "/dataScreen",
        title: "数据展示",
        element: DataScreen,
        meta: { requiresAuth: true, },
      },
      {
        path: "*",
        element: NotFound,
      },
    ],
  },
];

export const routerArray: any = [];

rootRouter?.forEach((item: any) => {
  return item?.children?.map((i: any) => routerArray.push(i));
});
const Router = () => {
  const routes = useRoutes(rootRouter);
  return routes;
};

export default Router;
