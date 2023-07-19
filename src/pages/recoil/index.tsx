import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { charCountState, textState, userInfoAtom } from "./store/store";
import { UserInfo, SelectFontSize, Counter } from "./component/index";
const Recoil = () => {
  return (
    <>
      <InputNuber />
      <CharCountState />
      <UserInfo />
      <SelectFontSize />
      <Counter />
      <div>
        <h2>Recoli Hooks(同步)</h2>
        <h3>声明状态</h3>
        const recoilStae = atom ｜ atomFamily | selector | selectorFamily
        <h3>读和写</h3>
        const [stateValue,setStateValue] = useRecoilState(recoilStae)
        <h3>读</h3>
        const stateValue = useRecoilValue(recoilStae)
        <h3>写</h3>
        const setStateValue = useSetRecoilState(recoilStae)
      </div>
    </>
  );
};
const InputNuber: React.FC = (props) => {
  const [text, setText] = useRecoilState(textState);
  const handeleChange = (e: any, name: any) => {
    console.log(name);

    // setText(e.target.value);
  };
  return (
    <div className="TextBox">
      {/* <input type="text" value={text} onChange={(e:any)=>handeleChange(e,name='userName')} /> */}
    </div>
  );
};
const CharCountState: React.FC = (props) => {
  const value = useRecoilValue(charCountState);
  return <div className="TextBox">{value}</div>;
};

export default Recoil;
