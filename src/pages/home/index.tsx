/*
 * @Author: liuyongqing
 * @Date: 2023-07-11 19:19:04
 * @LastEditors: liuyongqing
 * @LastEditTime: 2023-12-26 21:39:45
 */
import React, { Children, useCallback, useEffect, useState } from "react";
import { Son } from "./components";
import Grandp from "./components/Grandpa";
import { Button, Checkbox, Divider } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import request from "@/utils/request";
import welcome from "@/assets/images/welcome.png";
import { useRequest } from "ahooks";
import styles from "./index.mouule.less";
import { Select } from "antd";

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

  return (
    <>
      {details && details.map((item, index) => renderCard(item, index))}
      {/* <NormalSelect optionsApi={optionUrl} mode="multiple" allowClear style={{ width: "100%" }} />
       */}
    </>
  );
};

export default Home;
