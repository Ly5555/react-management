/*
 * @Author: liuyongqing
 * @Date: 2023-09-06 16:13:55
 * @LastEditors: liuyongqing
 * @LastEditTime: 2023-11-17 22:10:30
 */
import { create } from "zustand";
import { TabLists, IsExpand } from "./type";
// tabs
const useTabLists = create<TabLists>()((set) => ({
  tabList: [],
}));
//是否展开菜单
const useIsExpand = create<IsExpand>()(() => ({
  IsExpand: true,
}));
// 面包屑
const useBreadcrumb = create<any>()(() => ({
  breadcrumbList: [],
}));
// 样式主题
const useThemeColor = create(() => ({
  themeColor: "#1677FF",
}));
export { useTabLists, useIsExpand, useBreadcrumb, useThemeColor };
