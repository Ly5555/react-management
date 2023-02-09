// 状态管理
import { atom, selector } from "recoil";
// const menuLists = atom({
//   key: "menuLists",
//   default: [],
// });
// 监听打开的页面
const tabLists = atom({
  key: "tabLists",
  default: [],
});
//tabs
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
// 是否开展菜单
const IsExpand = atom({
  key: "IsExpand",
  default: false,
});
// 面包屑
const breadcrumbNameMap = atom({
  key: "breadcrumbNameMap",
  default: [],
});
export {  tabLists, tabListState,IsExpand,breadcrumbNameMap };
