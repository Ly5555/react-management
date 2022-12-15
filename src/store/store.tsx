import { atom, selector } from "recoil";
const menuLists = atom({
  key: "menuLists",
  default: [],
});
const charMenulist = selector({
    key: "charMenulist",
    get({ get }) {
      const text = get(menuLists);
      return text;
    },
  });



export { menuLists, };
