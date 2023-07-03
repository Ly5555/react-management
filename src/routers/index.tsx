import React, { lazy } from "react";
import lazyLoad from "@/components/lazyLoad"
import { Navigate, useRoutes } from "react-router-dom";

// 页面组件
import Login from "@/pages/LoginPage";
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
    path: "/",
    element: <Navigate to={"/login"} />,
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
          },
          {
            path: "/home/carouselChart",
            element: CarouselChart,
            title: "轮播图",
          },
        ],
      },
      {
        path: "/demo2",
        title: "测试22",
        children: [
          {
            path: "/demo2/lear",
            // element: lazyLoad(<LazyDemo />),
            element: LazyDemo,
            title: "js学习",
          },
          {
            path: "/demo2/TypeScripct",
            // element: lazyLoad(<TypeScripct />),
            element: TypeScripct,
            title: "TypeScripct",
          },
        ],
      },
      {
        path: "/dataScreen",
        title: "数据展示",
        element: DataScreen,
      },
      {
        path: "*",
        element: NotFound,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
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
