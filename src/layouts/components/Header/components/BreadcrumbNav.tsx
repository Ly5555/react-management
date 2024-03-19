/*
 * @Author: liuyongqing
 * @Date: 2023-04-19 21:17:42
 * @LastEditors: Lyq
 * @LastEditTime: 2024-03-18 21:27:29
 */
import React from "react";
import { Breadcrumb } from "antd";
import { useLocation } from "react-router-dom";
import { useBreadcrumb } from "@/stores";
const BreadcrumbNav = () => {
  const { pathname } = useLocation();
  const { breadcrumbList } = useBreadcrumb();

  const newBreadcrumbList = breadcrumbList[pathname]?.map((item: string) => {
    return {
      title: item,
    };
  }) || [{ title: "详情页" }];

  return (
    <div id="driver_breadcrumb">
      <Breadcrumb items={newBreadcrumbList} />
    </div>
  );
};

export default BreadcrumbNav;
