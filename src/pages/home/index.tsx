/*
 * @Author: liuyongqing
 * @Date: 2023-07-11 19:19:04
 * @LastEditors: liuyongqing
 * @LastEditTime: 2023-12-28 20:48:19
 */
import React, { Children, useCallback, useEffect, useState } from "react";
import { Son } from "./components";
import { Select } from "antd";
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
  const options = [];

  for (let i = 10; i < 36; i++) {
    options.push({
      value: i.toString(36) + i,
      label: i.toString(36) + i,
    });
  }
  return (
    <div className={styles.home_card}>
      {details && details.map((item, index) => renderCard(item, index))}
      <Select options={options} />
    </div>
  );
};

export default Home;
