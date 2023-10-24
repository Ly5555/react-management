/*
 * @Author: liuyongqing
 * @Date: 2023-04-19 21:17:42
 * @LastEditors: liuyongqing
 * @LastEditTime: 2023-10-24 21:02:23
 */
import React from "react";
import { Breadcrumb } from "antd";
import { useLocation } from "react-router-dom";
import { useBreadcrumb } from "@/store";
const BreadcrumbNav = () => {
  const { pathname } = useLocation();
  const { breadcrumbList } = useBreadcrumb();
  const newBreadcrumbList =
    breadcrumbList[pathname]?.map((item: string) => {
      return {
        title: item,
      };
    }) || [];
  return (
    <Breadcrumb items={newBreadcrumbList} />
    // >=5.3.0 可用，推荐的写法 ✅
    //  return <Breadcrumb items={[{ title: 'sample' }]} />;
  );
};

export default BreadcrumbNav;
