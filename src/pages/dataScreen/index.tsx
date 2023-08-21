import React, { useEffect, useState } from "react";
import dayjs from "dayjs";

import styles from "./index.module.less";
import { Anchor } from "antd";

const DataScreen = () => {
  const [currentId, setCurrentId] = useState(1);
  const navArr = [
    { name: "基础信息", id: 1 },
    { name: "价格库存", id: 2 },
    { name: "图文信息", id: 3 },
    { name: "商品资质", id: 4 },
  ];
  const handleScrollClick = (id: number) => {
    setCurrentId(id);
  };

  return (
    <div className={styles.dataScreen}>
      <div className={styles.good_left_icon}>
        <div className={styles.good_left_data}>
          {navArr.map((item) => {
            return (
              <a key={item.id}>
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
    </div>
  );
};
export default DataScreen;
