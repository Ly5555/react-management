import React from 'react'
import { searchRoute, getOpenKeys, findAllBreadcrumb } from "@/utils/util";
import abortController from '@/utils/request/abortController';
import { rootRouter } from "@/routers/index";
import { Navigate, useLocation } from 'react-router-dom';
import { tokenAtom } from '@/store/store';
const AuthRouter = () => {
  const { pathname } = useLocation();
  const route = searchRoute(pathname, rootRouter);
  // 在跳转路由之前，清除所有的请求
  abortController.removeAllPending();
  const token = tokenAtom;
  if (!token) return <Navigate to="/login" replace />;
  return (
    <div>

    </div>
  )
}

export default AuthRouter
