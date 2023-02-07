// 状态管理
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
    return tabList.map((item: Menu.MenuOptions,index) => {
      return {
        key: item?.path,
        label: item?.title,
      };
    });
  },
});
export { menuLists, tabLists, tabListState };
