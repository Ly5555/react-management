/*
 * @Author: liuyongqing
 * @Date: 2023-07-11 19:19:04
 * @LastEditors: liuyongqing
 * @LastEditTime: 2023-09-04 14:11:18
 * @FilePath: /个人/react-webpack-ts/src/pages/home/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
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
const Home = () => {
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
