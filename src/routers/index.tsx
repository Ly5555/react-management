import React, { lazy } from "react";
import lazyLoad from "@/components/lazyLoad";
import { Navigate, useRoutes } from "react-router-dom";

// 页面组件
const LoginPage = lazyLoad(lazy(() => import("@/pages/LoginPage")));
const LayoutIndex = lazyLoad(lazy(() => import("@/components/Layout")));
const Home = lazyLoad(lazy(() => import("@/pages/home")));
const LazyDemo = lazyLoad(lazy(() => import("@/pages/javascripct/LazyDemo")));
const CarouselChart = lazyLoad(lazy(() => import("@/pages/carouselChart")));
const TypeScripct = lazyLoad(lazy(() => import("@/pages/TypeScripct")));
const DataScreen = lazyLoad(lazy(() => import("@/pages/dataScreen")));
const NotFound = lazyLoad(lazy(() => import("@/pages/NotFound/index")));

// 页面组件
export const routerArray: any = [
  {
    path: "/home",
    meta: { title: "首页" },
    element: Home,
  },
  // {
  //   children: [
  //     {
  //       path: "/home/homes",
  //       element: Home,
  //       meta: { requiresAuth: true, title: "首页", key: "homes" },
  //     },
  //     {
  //       path: "/home/carouselChart",
  //       element: CarouselChart,
  //       meta: { requiresAuth: true, title: "轮播图", key: "carouselChart" },
  //     },
  //   ],
  // },
  {
    meta: { title: "测试22" },
    children: [
      {
        path: "/demo2/lear",
        meta: { requiresAuth: true, title: "js学习", key: "lear" },
        element: LazyDemo,
      },
      {
        path: "/demo2/TypeScripct",
        meta: { requiresAuth: true, title: "TypeScripct", key: "TypeScripct" },
        element: TypeScripct,
      },
    ],
  },
  {
    path: "/dataScreen",
    element: DataScreen,
    meta: { requiresAuth: true, title: "数据展示" },
  },
  {
    path: "/404",
    element: NotFound,
    meta: {
      requiresAuth: false, title: "404页面", key: "404",
    },
  },
  {
    path: "*",
    element: <Navigate to="/404" />
  }
];

const Router = () => {
  const rootRouter = [{
    path: "/",
    element: <Navigate to="/login" />
  }, {
    path: "/login",
    element: LoginPage,
  }, { element: LayoutIndex, children: routerArray }];
  console.log(rootRouter);

  const routes = useRoutes(rootRouter);

  return routes;
};

export default Router;
