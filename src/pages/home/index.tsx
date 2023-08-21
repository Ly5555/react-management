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
import welcome from "@/assets/images/welcome.png";
import styles from "./index.mouule.less";
const Home = () => {
  return (
    <div className={styles.home_card}>
      <img src={welcome} alt="welcome" />
    </div>
  );
  return (
    <div>
      <h3>React学习和antV</h3>
      <LoadingModal />
      {/* <Button onClick={handleClick}>接口测试</Button>
      <CustomHooks />
      <>==================================</>
      <Grandp />
      <HOC name={"hello"} />
      <ChildUseMemo />
      <HooksMemo />
      <PieChat />
      //
      <ChilduseCallback />
      <ChilidRef />
      <>ChilduseImperativeHandle</>
      <ChilduseImperativeHandle /> */}
    </div>
  );
};

export default Home;
