import React from "react";
import { RecoilRoot, useRecoilState, useRecoilValue } from "recoil";
import { charCountState, textState } from "./store/store";
const Recoil = () => {
  return (
    <div>
      <RecoilRoot>
        <InputNuber />
        <CharCountState />
      </RecoilRoot>
    </div>
  );
};
const InputNuber: React.FC = (props) => {
  const [text, setText] = useRecoilState(textState);
  const handeleChange = (e: any) => {
    setText(e.target.value);
  };
  return (
    <div className="TextBox">
      <input type="text" value={text} onChange={handeleChange} />
    </div>
  );
};
const CharCountState: React.FC = (props) => {
  const value = useRecoilValue(charCountState);
  return <div className="TextBox">{value}</div>;
};

export default Recoil;
