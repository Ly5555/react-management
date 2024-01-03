/*
 * @Author: liuyongqing
 * @Date: 2023-07-11 19:19:04
 * @LastEditors: liuyongqing
 * @LastEditTime: 2024-01-01 21:41:08
 */
import React, { Children, useCallback, useEffect, useState } from "react";
import { Son } from "./components";
import { Select } from "antd";
import styles from "./home.mouule.less";
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
  return <div className={styles.home_card}>{details && details.map((item, index) => renderCard(item, index))}</div>;
};

export default Home;
