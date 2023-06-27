import React, { useEffect, useState } from "react";
import {
  HooksMemo,
  PieChat,
  LoadingModal,
  HOC,
  ChilduseImperativeHandle,
  ChildUseMemo,
  ChilduseCallback,
  ChilidRef,
  CustomHooks,
} from "./components";
import Grandp from "./components/Grandpa";
import { Button } from "antd";
import request from "@/utils/request/request";

const Home = () => {
  useEffect(() => {
    request({
      url: "https://www.fastmock.site/mock/302854084413bb6592dc4c53c7f85991/admin/menu/list1",
      loading: true
    }).then((res) => {
      console.log(res);
    })
  }, [])
  const handleClick = () => {

  };
  return (
    <div>
      <h3>React学习和antV</h3>
      <Button onClick={handleClick}>接口测试</Button>
      <CustomHooks />
      <>==================================</>
      <Grandp />
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
