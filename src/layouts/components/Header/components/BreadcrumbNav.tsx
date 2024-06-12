/*
 * @Author: Lyq
 * @Date: 2023-04-19 21:17:42
 * @LastEditors: Lyq
 * @LastEditTime: 2024-06-12 21:27:16
 */
import React, { useEffect } from "react";
import { Breadcrumb } from "antd";
import { useLocation } from "react-router-dom";
import { useBreadcrumb } from "@/stores";
import { MenuItem,ResultItem } from "../type";
const BreadcrumbNav = () => {
  const { pathname } = useLocation();
  const { breadcrumbList } = useBreadcrumb();
  const transformMenu = (items: MenuItem[]): { [key: string]: ResultItem[] } => {
    const result: { [key: string]: ResultItem[] } = {};
    function traverse(items: MenuItem[], parents: ResultItem[] = []): void {
      items.forEach((item: MenuItem) => {
        const currentPath = parents.concat({ title: item.title });
        if (!item.children) {
          result[item.path] = currentPath;
        } else {
          result[item.path] = currentPath;
          traverse(item.children, currentPath);
        }
      });
    }
    traverse(items);
    return result;
  };
  return (
    <div id="driver_breadcrumb">
      <Breadcrumb items={transformMenu(breadcrumbList)[pathname] || []} />
    </div>
  );
};

export default BreadcrumbNav;
