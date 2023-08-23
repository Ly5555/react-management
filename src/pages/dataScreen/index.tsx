import React, { useEffect, useState } from "react";
import dayjs from "dayjs";

import styles from "./index.module.less";

const DataScreen = () => {
  const [currentId, setCurrentId] = useState("1");
  useEffect(() => {
    window.addEventListener("scroll", handleScroll, true);
    return () => {
      window.removeEventListener("scroll", handleScroll, true);
    };
  }, []);
  const navArr = [
    { name: "基础信息", id: "1" },
    { name: "价格库存", id: "2" },
    { name: "图文信息", id: "3" },
    { name: "商品资质", id: "4" },
  ];
  const handleScrollClick = (id: string) => {
    setCurrentId(id);
    handleScroll()
  };
  // 滚动条滚动选中
  const handleScroll = () => {
    let scrollTop = document.getElementById("right")?.scrollTop as number;
    let section = Array.from(document.querySelector("#right")?.children || []);
    let activeChannel = ""
    section.map((item: any) => {
      let itemTop = item?.offsetTop;
      if (scrollTop > itemTop - 110) {
        activeChannel = item.id
      }
    })
    setCurrentId(activeChannel);
  };
  return (
    <>
      <div className={styles.dataScreen}>
        <div className={styles.good_left_icon}>
          <div className={styles.good_left_data}>
            {navArr.map((item) => {
              return (
                <a key={item.id} >
                  <div
                    className={`${styles.good_left_curr} ${currentId === item.id ? styles.actived : ""}`}
                    onClick={() => handleScrollClick(item.id)}>
                    {item.name}
                  </div>
                </a>
              );
            })}
          </div>
        </div>
        <div className={styles.goodRight} id="right">
          <div id="1" className={styles.goodRightBanner}>1</div>
          <div id="2" className={styles.goodRightBanner}>2</div>
          <div id="3" className={styles.goodRightBanner}>3</div>
          <div id="4" className={styles.goodRightBanner}>4</div>
        </div>
      </div>
    </>
  );
};
export default DataScreen;
