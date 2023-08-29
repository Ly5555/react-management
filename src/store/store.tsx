// 状态管理
import { HOME_URL } from "@/config/config";
import { DefaultValue, atom, selector } from "recoil";
// 监听打开的页面
const tabLists = atom({
  key: "tabLists",
  default: [],
});
//tabs
const isManyTabs = atom({
  key: "ismanytabs",
  default: false,
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

const localStorageEffect =
  (key: string) =>
  ({ setSelf, onSet }: any) => {
    const savedValue = localStorage.getItem(key);
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
  key: "tokenAtom",
  default: "",
  effects_UNSTABLE: [localStorageEffect("token")],
});

export { tabLists, isManyTabs, IsExpand, breadcrumbNameMap, themeColor, tokenAtom };
