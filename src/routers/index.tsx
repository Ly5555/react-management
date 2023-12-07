/*
 * @Author: liuyongqing
 * @Date: 2023-08-29 21:41:58
 * @LastEditors: liuyongqing
 * @LastEditTime: 2023-12-07 22:30:14
 */
import React, { lazy } from "react";
import lazyLoad from "@/components/lazyLoad";
import { Navigate, useRoutes } from "react-router-dom";

// 页面组件
const LoginPage = lazyLoad(lazy(() => import("@/pages/LoginPage")));
const LayoutIndex = lazyLoad(lazy(() => import("@/components/Layout")));
const Home = lazyLoad(lazy(() => import("@/pages/home")));
const CarouselChart = lazyLoad(lazy(() => import("@/pages/carouselChart")));
const CustomHooks = lazyLoad(lazy(() => import("@/pages/customHooks")));
const DataScreen = lazyLoad(lazy(() => import("@/pages/dataScreen")));
const FormTable = lazyLoad(lazy(() => import("@/pages/FormTable")));
const NotFound = lazyLoad(lazy(() => import("@/components/NotFound/index")));

// 页面组件
export const routerArray: any = [
  {
    path: "/home",
    meta: { requiresAuth: true, title: "首页" },
    element: Home,
  },
  {
    path: "/CarouselChart",
    meta: { requiresAuth: true, title: "轮播图" },
    element: CarouselChart,
  },
  {
    meta: { requiresAuth: true, title: "轮播图" },
    children: [
      {
        path: "/abc/custom-hooks",
        meta: { requiresAuth: true, title: "hooks&自定义" },
        element: CustomHooks,
      },
    ],
  },
  {
    path: "/formtable",
    meta: { requiresAuth: true, title: "表单Table" },
    element: FormTable,
  },
  {
    path: "/datascreen",
    meta: { requiresAuth: true, title: "数据展示" },
    element: DataScreen,
  },
  {
    path: "/404",
    element: NotFound,
    meta: {
      requiresAuth: false,
      title: "404页面",
      key: "404",
    },
  },
  {
    path: "*",
    element: <Navigate to="/404" />,
  },
];

const Router = () => {
  const rootRouter = [
    {
      path: "/",
      element: <Navigate to="/login" />,
    },
    {
      path: "/login",
      element: LoginPage,
    },
    { element: LayoutIndex, children: routerArray },
  ];

  const routes = useRoutes(rootRouter);
  return routes;
};

export default Router;
