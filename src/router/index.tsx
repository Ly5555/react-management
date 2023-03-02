import React, { Suspense, lazy } from "react";
import { useRoutes } from "react-router-dom";
import LayoutIndex from "@/components/Layout";
// 页面组件
const Home = lazy(() => import("@/pages/recoil/index"));
const LazyDemo = lazy(() => import("@/components/LazyDemo"));
const Lear = lazy(() => import("@/pages/lear/Lear"));
const CarouselChart = lazy(() => import("@/pages/carouselChart"));
const TypeScripct = lazy(() => import("@/pages/TypeScripct"));
const NotFound = lazy(() => import("@/pages/NotFound/index"));
// 页面组件
const rootRouter: any = [
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
            title: "测试",
            meta: {
              title: "测试",
            },
          },
          {
            path: "/demo2/TypeScripct",
            element: <TypeScripct />,
            title: "TypeScripct",
          },
        ],
      },
      {
        path: "*",
        elment: <NotFound />,
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
