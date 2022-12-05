import React, { Suspense, lazy } from "react";
import { useRoutes } from "react-router-dom";
import { RouteObject } from './type';
import Mylayout  from "@/components/Layout";
// 页面组件
const Home = lazy(() => import("@/pages/recoil/index"));
const LazyDemo = lazy(() => import("@/components/LazyDemo"));
const Lear = lazy(() => import("@/pages/lear/Lear"));
const NotFound = lazy(() => import("@/pages/NotFound/index"));

// 页面组件
const rootRouter: any = [
  {
    path: "/",
    element: <Mylayout />,
    children: [
      {
        path: "/home",
        title: "首页",
        element: <Home />,
      },
      {
        path: "/demo2",
        title: "测试22",
        element: <Lear />,
        children: [
          {
            path: "/demo2/lear",
            element: <LazyDemo />,
            title: "测试",
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
export const routerArray: RouteObject[] = [];
routerArray.push(...rootRouter[0]?.children);
const Router = () => {
  const routes = useRoutes(rootRouter);
  return routes;
};

export default Router;
