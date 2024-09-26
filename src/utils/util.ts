/*
 * @Author: Lyq
 * @Date: 2023-11-16 22:28:43
 * @LastEditors: Lyq 
 * @LastEditTime: 2024-06-12 21:30:25
 */
import { RouteObject } from "@/routers/type";
/**
 * @description 递归查询对应的路由
 * @param {String} path 当前访问地址
 * @param {Array} routes 路由列表
 * @returns array
 */
export const searchRoute = (path: string, routes: RouteObject[] = []): RouteObject => {
  let result: RouteObject = {};
  for (let item of routes) {
    if (item.path === path) return item;
    if (item.children) {
      const res = searchRoute(path, item.children);
      if (Object.keys(res).length) result = res;
    }
  }
  return result;
};
/**
 * @description 获取需要展开的 subMenu
 * @param {String} path 当前访问地址
 * @returns array
 */
export const getOpenKeys = (path: string) => {
  const arr: any[] = path.split("/").filter(item => item !== ""); // 使用 filter 过滤掉空字符串
  const newArr: any[] = arr.map((_, index) => `/${arr.slice(0, index + 1).join("/")}`);
  // 使用 slice 和 join 优化字符串拼接
  return newArr
};




