/*
 * @Author: liuyongqing
 * @Date: 2023-09-06 19:51:49
 * @LastEditors: liuyongqing
 * @LastEditTime: 2023-11-21 20:42:22
 */
import React from "react";
import { searchRoute } from "@/utils/util";
import abortController from "@/utils/request/abortController";
import { routerArray } from "@/routers/index";
import { Navigate, useLocation } from "react-router-dom";
import { useToken } from "@/store";
const AuthRouter = (props: { children: JSX.Element }) => {
  const { pathname } = useLocation();
  const { token } = useToken();
  const route = searchRoute(pathname, routerArray);
  if (!route.meta?.requiresAuth) return props.children;
  // 在跳转路由之前，清除所有的请求
  abortController.removeAllPending();
  if (!token) return <Navigate to={"/login"} replace />;
  return props.children;
};

export default AuthRouter;
