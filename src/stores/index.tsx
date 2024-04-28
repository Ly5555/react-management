/*
 * @Author: Lyq
 * @Date: 2023-09-06 16:13:55
 * @LastEditors: Lyq
 * @LastEditTime: 2024-04-21 20:12:14
 */
import { create } from "zustand";
import { devtools, persist, createJSONStorage } from "zustand/middleware";
import { TabLists, State, Action, Loading } from "./type";
// tabs
const useTabLists = create<TabLists>()((set) => ({
  tabList: [],
}));
const useMenuList = create<any>()((set) => ({
  menuList: [],
}));
// 面包屑
const useBreadcrumb = create<any>()(() => ({
  breadcrumbList: [],
}));

const useGlobalStore = create<State & Action>()(
  devtools(
    persist(
      (set) => {
        return {
          token: "",
          refreshToken: "",
          collapsed: false,
          themeColor: "#1677ff",
          darkMode: false,
          setDarkMode: (darkMode: State["darkMode"]) => set({ darkMode }),
          setThemeColor: (themeColor: State["themeColor"]) => set({ themeColor }),
          setToken: (token: State["token"]) => set({ token }),
          setCollapsed: (collapsed: State["collapsed"]) => set({ collapsed }),
          setRefreshToken: (refreshToken: State["refreshToken"]) => set({ refreshToken }),
        };
      },
      {
        name: "globalStore",
        storage: createJSONStorage(() => localStorage),
      },
    ),
    { name: "globalStore" },
  ),
);

// loading
const useLoading = create<Loading>()(() => ({
  loading: true,
}));
export { useTabLists, useMenuList, useBreadcrumb, useGlobalStore, useLoading };
