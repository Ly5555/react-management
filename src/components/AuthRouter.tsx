/*
 * @Author: liuyongqing
 * @Date: 2023-09-06 19:51:49
 * @LastEditors: liuyongqing
 * @LastEditTime: 2023-12-07 21:40:23
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

  if (!token) return <Navigate to={"/login"} replace />;
  return props.children;
};

export default AuthRouter;
