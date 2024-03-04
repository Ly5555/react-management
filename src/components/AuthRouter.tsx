/*
 * @Author: Lyq
 * @Date: 2023-09-06 19:51:49
 * @LastEditors: Lyq
 * @LastEditTime: 2024-03-04 20:21:16
 */
import React from "react";
import { searchRoute } from "@/utils/util";
import abortController from "@/utils/request/abortController";
import { routerArray } from "@/routers/index";
import { Navigate, useLocation } from "react-router-dom";
import { useGlobalStore } from "@/stores";
const AuthRouter = (props: { children: JSX.Element }) => {
  const { pathname } = useLocation();
  const route = searchRoute(pathname, routerArray);
  // 在跳转路由之前，清除所有的请求
  abortController.removeAllPending();
  if (!route.meta?.requiresAuth) return props.children;
  const { token } = useGlobalStore.getState();
  // 先注释掉
  // if (!token) return <Navigate to={"/login"} replace />;
  return props.children;
};

export default AuthRouter;
