/*
 * @Author: Lyq
 * @Date: 2023-07-11 19:19:04
 * @LastEditors: Lyq
 * @LastEditTime: 2024-08-08 07:49:21
 */
import React, { useCallback, useEffect } from "react";
import { Son } from "./components";
import { Button } from "antd";
import styles from "./home.module.less";
import { lib } from "@/utils/request";
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
  useEffect(() => {
    handleClock();
  }, []);
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

  const handleClock = async () => {
    // downloadGet("http://localhost:3000/upload/export", "lyq.zip");
  };

  return (
    <div className={styles.home_card}>
      {details && details.map((item, index) => renderCard(item, index))}
      <Button onClick={handleClock}>测试下载</Button>
    </div>
  );
};

export default Home;
