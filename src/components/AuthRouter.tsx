import React from 'react'
import { searchRoute } from "@/utils/util";
import abortController from '@/utils/request/abortController';
import { rootRouter } from "@/routers/index";
import { Navigate, useLocation } from 'react-router-dom';
import { tokenAtom } from '@/store/store';
import { useRecoilValue } from 'recoil';
const AuthRouter = (props: { children: JSX.Element }) => {
  const { pathname } = useLocation();
  const route = searchRoute(pathname, rootRouter);
  if (!route.meta?.requiresAuth) return props.children;
  // 在跳转路由之前，清除所有的请求
  abortController.removeAllPending();
  const token = useRecoilValue(tokenAtom);
  if (!token) return <Navigate to={"/login"} replace />
  return props.children
}

export default AuthRouter
