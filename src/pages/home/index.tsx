import React, {useEffect, useState} from "react";
import {
  HooksMemo,
  PieChat,
  LoadingModal,
  HOC,
  ChilduseImperativeHandle,
  ChildUseMemo,
  ChilduseCallback,
  ChilidRef,
} from "./components";
import Grandp from "./components/Grandpa";
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
      <Grandp />
      <Button onClick={handleClick}>{number}</Button>
      <HOC name={"hello"} />
      <ChildUseMemo />
      <HooksMemo />
      <PieChat />
      <LoadingModal />
      <ChilduseCallback />
      <ChilidRef />
      <>ChilduseImperativeHandle</>
      <ChilduseImperativeHandle />
    </div>
  );
};

export default Home;
