import React, { Suspense, lazy } from "react";
import { Loading } from "@/components/";
// 页面组件
const Home = lazy(() => import("@/pages/recoil/index"));

const mainRoutes: any = [
  {
    path: "home",
    component: Home,
    title: "首页",
    isNav: true,
    auth: false,
  },
];
interface IRouter {
  path: string;
  component: any;
  title?: string;
  icon?: any;
  auth?: boolean;
  exact?: boolean;
  isNav?: boolean;
  children?: Array<IRouter>;
}
// 路由处理方式
const generateRouter = (routes: Array<IRouter>) =>
  routes.map((item: any) => {
    const newItem = { ...item };
    if (item.children) {
      newItem.children = generateRouter(item.children);
    }
    // 路由懒加载
    newItem.element = (
      <Suspense fallback={<Loading />}>
        <item.component />
      </Suspense>
    );
    // item.element = <item.component />;

    return newItem;
  });
const MainRouter = generateRouter(mainRoutes);

export { MainRouter };
