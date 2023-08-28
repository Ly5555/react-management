import React, { Children, useCallback, useEffect, useState } from "react";
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
  Son,
} from "./components";
import Grandp from "./components/Grandpa";
import { Button } from "antd";
import request from "@/utils/request/request";
import welcome from "@/assets/images/welcome.png";

import styles from "./index.mouule.less";

enum cardType {
  DEFAULT = "default",
  MIX = "mix",
  ITEM = "item",
}
interface ISubSectionData {
  name: string;
  age: number;
  cardType: string;
}
type CardType = "DEFAULT" | "MIX" | "ITEM";
const Home = () => {
  // return (
  //   <div className={styles.home_card}>
  //     <img src={welcome} alt="welcome" />
  //   </div>
  // );
  const details = [
    { name: "1", age: 13, cardType: "default" },
    { name: "2", age: 23, cardType: "mix" },
    { name: "3", age: 33, cardType: "item" },
  ];
  const renderCard = useCallback((card: ISubSectionData, key: number) => {
    const { cardType: type } = card || {};
    switch (type) {
      case cardType.DEFAULT:
        return <Son data={card} key={key} />;
      case cardType.MIX:
        return <Son data={card} key={key} />;
      case cardType.ITEM:
        return <Son data={card} key={key} />;
      default:
        return null;
    }
  }, []);
  return <>{details && details.map((item, index) => renderCard(item, index))}</>;
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
