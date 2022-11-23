import React, { Suspense, lazy } from "react";
import { useRoutes } from "react-router-dom";
import { PieChartOutlined } from "@ant-design/icons";
import { Loading,  } from "@/components/index";
// 页面组件
const Home = lazy(() => import("@/pages/recoil/index"));
const Lear = lazy(() => import("@/pages/lear/Lear"));
const NotFound =lazy(() => import("@/pages/NotFound/index"));
const mainRoutes: any = [
  {
    path: "home",
    component: Home,
    title: "首页",
    isNav: true,
    icon: <PieChartOutlined />,
    children: [
      {
        path: "/home/lear",
        component: Lear,
        title: "首页",
        isNav: true,
      },
    ],
  },
  {
    path: "*",
    component: NotFound,
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
    return newItem;
  });

const MainRouter = generateRouter(mainRoutes);
export { MainRouter };
