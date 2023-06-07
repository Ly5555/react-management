import React, {useEffect, useState} from "react";
import {HooksMemo, PieChat, LoadingModal,HOC} from "./components";
import Grandp from "./components/Grandpa"
import {Button} from "antd";
import request from "@/utils/request";

const Home = () => {
  const [number, setNumber] = useState(0);
  const handleClick = () => {
    setNumber((prev) => prev + 1);
  };
  return (
    <div>
      <h3>React学习和antV</h3>
      <Grandp/>
      <Button onClick={handleClick}>{number}</Button>
      <HOC name={"hello"}/>
      <HooksMemo />
      <PieChat />
      <LoadingModal />
    </div>
  );
};

export default Home;

//  react Hoooks的学习
const Home1 = () => {
  const [number, setNumber] = useState(0);
  const handleClick = () => {
    setNumber((prev) => prev + 1);
  };
  const HomeProps = {
    name: "Home",
    age: 21,
    mes: "let us learn React !",
  };
  return (
    <>
      <h3>React学习和antV</h3>
      <Button onClick={handleClick}>{number}</Button>
      <HooksMemo />
      <PieChat />
      <LoadingModal />
      {/* <Father>
        <Son name="alien" age="28" />
      </Father> */}
    </>
  );
};
// const Father = (props: any) => {
//   return props.children;
// };
// function Son(props: any) {
//   console.log(props, "39");
//   return <div> hello,world </div>;
// }
