import React from "react";
import { atom, selector } from "recoil";
const menuLists = atom({
  key: "menuLists",
  default: [],
});
// 监听打开的页面
const tabLists = atom({
  key: "tabLists",
  default: [],
});


//
const tabListState = selector({
  key: "tabListState",
  get: ({ get }) => {
    const tabList = get(tabLists);
    console.log(tabList,'store');
    return tabList.map((item: any,index) => {
      return {
        key: item?.path,
        label: item?.title,
        children:item?.element
      };
    });
  },
});
export { menuLists, tabLists, tabListState };
