import { atom, selector } from "recoil";
const textState = atom({
  key: "textState", // 全局唯一
  default: "",
});
const charCountState = selector({
  key: "charCountState",
  get({ get }) {
    const text = get(textState);
    return text.length;
  },
});

const userInfoAtom = atom({
  key: "userInfoAtom",
  default: {
    username: "张三",
    score: 10,
  },
  effects: [
    ({ node, onSet }) => {
      onSet((newValue: any, oldValue: any) => {
        console.log(
          "🚀 ~ file: store.tsx ~ line 23 ~ onSet ~ oldValue",
          oldValue
        );
        console.log(
          "🚀 ~ file: store.tsx ~ line 23 ~ onSet ~ newValue",
          newValue
        );
      });
    },
  ],
  dangerouslyAllowMutability: true,
});
// 字体大小原子状态
const fontSizeAtom = atom({
  key: "fontSizeAtom",
  default: 16,
});
const fontSizeState = selector({
  key: "fontSizeState",
  get:({ get }) =>{
     const fontSizeNum = get(fontSizeAtom);
     return fontSizeNum  + "px";
  }})


// 计数器
 const CountAtom = atom({
  key: 'countAtom',
  default: 0
});
export { textState, charCountState, userInfoAtom ,fontSizeAtom,fontSizeState,CountAtom};
