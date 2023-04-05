import React, { Suspense, lazy } from "react";
import { Navigate, useRoutes } from "react-router-dom";
import LayoutIndex from "@/components/Layout";
// 页面组件
import Login from "@/pages/LoginPage";
const Home = lazy(() => import("@/pages/home"));
const LazyDemo = lazy(() => import("@/pages/javascripct/LazyDemo"));
const Lear = lazy(() => import("@/pages/lear/Lear"));
const CarouselChart = lazy(() => import("@/pages/carouselChart"));
const TypeScripct = lazy(() => import("@/pages/TypeScripct"));
const NotFound = lazy(() => import("@/pages/NotFound/index"));
// 页面组件
const rootRouter: any = [
  {
    path: "/",
    element: <Navigate to={"/login"} />,
  },
  {
    path: "/",
    element: <LayoutIndex />,
    children: [
      {
        path: "/home",
        title: "首页",
        children: [
          {
            path: "/home/home",
            element: <Home />,
            title: "首页",
            meta: {
              title: "首页",
            },
          },
          {
            path: "/home/carouselChart",
            element: <CarouselChart />,
            title: "轮播图",
            meta: {
              title: "轮播图",
            },
          },
        ],
      },
      {
        path: "/demo2",
        title: "测试22",
        children: [
          {
            path: "/demo2/lear",
            element: <LazyDemo />,
            title: "js学习",
            meta: {
              title: "js学习",
            },
          },
          {
            path: "/demo2/TypeScripct",
            element: <TypeScripct />,
            title: "TypeScripct",
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
    meta: {
      title: "登录页",
      key: "login",
    },
  },
  {
    path: "*",
    element: <NotFound />,
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
