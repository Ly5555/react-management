/*
 * @Author: Lyq
 * @Date: 2024-06-12 21:25:35
 * @LastEditors: Lyq
 * @LastEditTime: 2024-06-12 21:25:55
 */
 export interface MenuItem {
  path: string;
  title: string;
  children?: MenuItem[];
}
export interface ResultItem {
  title: string;
}
