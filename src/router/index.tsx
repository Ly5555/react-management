import React, { Suspense, lazy } from "react";
import { useRoutes } from "react-router-dom";
import { PieChartOutlined, AreaChartOutlined } from "@ant-design/icons";
import { Loading } from "@/components/index";
// 页面组件
const Home = lazy(() => import("@/pages/recoil/index"));
const LazyDemo = lazy(() => import("@/components/LazyDemo"));
const Lear = lazy(() => import("@/pages/lear/Lear"));
const NotFound = lazy(() => import("@/pages/NotFound/index"));

// 页面组件
export const rootRouter: any = [
  {
    path: "/",
    title: "首页",
    element: <Home />,
    icon: <PieChartOutlined />,
    children: [
      {
        path: "/home/lear",
        element: <LazyDemo />,
        title: "测试",
      },
    ],
  },
  {
    path: "/demo2",
    title: "测试22",
    element: <Lear />,
    icon: <AreaChartOutlined />,
  },
  {
    path: "*",
    elment: <NotFound />,
  },
];
const Router = () => {
  const routes = useRoutes(rootRouter);
  return routes;
};

export default Router;
