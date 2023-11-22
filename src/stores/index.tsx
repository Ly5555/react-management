/*
 * @Author: liuyongqing
 * @Date: 2023-09-06 16:13:55
 * @LastEditors: liuyongqing
 * @LastEditTime: 2023-11-22 21:15:25
 */
import { create } from "zustand";
import { devtools, persist, createJSONStorage } from "zustand/middleware";
import { TabLists, IsExpand } from "./type";
// tabs
const useTabLists = create<TabLists>()((set) => ({
  tabList: [],
}));

// 面包屑
const useBreadcrumb = create<any>()(() => ({
  breadcrumbList: [],
}));
// 样式主题
const useThemeColor = create(() => ({
  themeColor: "#1677FF",
}));
// token

interface State {
  // darkMode: boolean;
  collapsed: boolean;
  // lang: string;
  token: string;
  refreshToken: string;
}
interface Action {
  // setDarkMode: (darkMode: State["darkMode"]) => void;
  setCollapsed: (collapsed: State["collapsed"]) => void;
  // setLang: (lang: State["lang"]) => void;
  setToken: (lang: State["token"]) => void;
  // setRefreshToken: (lang: State["refreshToken"]) => void;
}
const useGlobalStore = create<State & Action>()(
  devtools(
    persist(
      (set) => {
        return {
          token: "",
          refreshToken: "",
          collapsed: false,
          setToken: (token: State["token"]) =>
            set({
              token,
            }),
          setCollapsed: (collapsed: State["collapsed"]) =>
            set({
              collapsed,
            }),
          setRefreshToken: (refreshToken: State["refreshToken"]) =>
            set({
              refreshToken,
            }),
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

export { useTabLists, useBreadcrumb, useThemeColor, useGlobalStore };
