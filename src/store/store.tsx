// 状态管理
import { DefaultValue, atom, selector } from "recoil";
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
    return tabList.map((item: Menu.MenuOptions, index) => {
      return {
        key: item?.path,
        label: item?.title,
        closable: item.title === "首页" ? false : true
      };
    }).filter((item) => item.key);;
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
// ant 样式主题
const themeColor = atom({
  key: "themeColor",
  default: "#1677FF",
});
//全局主题 暗黑正常
const algorithm = atom({
  key: "algorithm",
  default: "light"
})
const localStorageEffect = (key: string) => ({ setSelf, onSet }: any) => {
  const savedValue = localStorage.getItem(key)
  if (savedValue != null) {
    setSelf(JSON.parse(savedValue));
  }
  onSet((newValue: any) => {
    if (newValue instanceof DefaultValue) {
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, JSON.stringify(newValue));
    }
  });
};
// token
const tokenAtom = atom({
  key: 'tokenAtom',
  default: "",
  effects_UNSTABLE: [
    localStorageEffect('token'),
  ]
})


export { tabLists, tabListState, IsExpand, breadcrumbNameMap, themeColor, tokenAtom, algorithm };
