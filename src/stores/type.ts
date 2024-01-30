/*
 * @Author: liuyongqing
 * @Date: 2023-09-06 17:13:39
 * @LastEditors: Lyq
 * @LastEditTime: 2024-01-30 21:15:50
 */
export interface TabLists {
  tabList: {
    key: string;
    title: string;
    path: string;
  }[];
}
export interface IsExpand {
  IsExpand: boolean;
}
export interface State {
  darkMode: boolean;
  collapsed: boolean;
  themeColor: string;
  // lang: string;
  token: string;
  refreshToken: string;
}
export interface Action {
  setDarkMode: (darkMode: State["darkMode"]) => void;
  setThemeColor: (darkMode: State["themeColor"]) => void;
  setCollapsed: (collapsed: State["collapsed"]) => void;
  // setLang: (lang: State["lang"]) => void;
  // setToken: (lang: State["token"]) => void;
  // setRefreshToken: (lang: State["refreshToken"]) => void;
}