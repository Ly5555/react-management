import { themeColor } from '@/store/store';
/*
 * @Author: liuyongqing
 * @Date: 2023-09-06 17:13:39
 * @LastEditors: liuyongqing 
 * @LastEditTime: 2023-09-06 20:05:26
 */
export interface TabLists {
  tabList: {
    title: string;
    path: string;
  }[];
}
export interface IsExpand {
  IsExpand: boolean;
}