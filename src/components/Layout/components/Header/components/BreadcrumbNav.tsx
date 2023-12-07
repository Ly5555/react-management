/*
 * @Author: liuyongqing
 * @Date: 2023-04-19 21:17:42
 * @LastEditors: liuyongqing
 * @LastEditTime: 2023-12-07 21:08:17
 */
import React from "react";
import { Breadcrumb } from "antd";
import { useLocation } from "react-router-dom";
import { useBreadcrumb } from "@/stores";
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
    <div id="driver_breadcrumb">
      <Breadcrumb items={newBreadcrumbList} />
    </div>

    // >=5.3.0 可用，推荐的写法 ✅
    //  return <Breadcrumb items={[{ title: 'sample' }]} />;
  );
};

export default BreadcrumbNav;
