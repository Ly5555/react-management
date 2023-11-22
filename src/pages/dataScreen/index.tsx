/*
 * @Author: liuyongqing
 * @Date: 2023-09-25 20:14:16
 * @LastEditors: liuyongqing
 * @LastEditTime: 2023-10-08 21:13:34
 */
import React, { useEffect, useState, useRef } from "react";
import request from "@/utils/request";
import styles from "./index.module.less";

const DataScreen = () => {
  const [currentId, setCurrentId] = useState("foundation");
  const getDetail = async () => {
    const { data } = await request({
      url: "https://www.fastmock.site/mock/302854084413bb6592dc4c53c7f85991/admin/detail",
      method: "post",
    });
  };
  // 防抖
  function debounce(fn: any, delay: any) {
    let timer: any;
    return (...args: any) => {
      clearTimeout(timer);
      timer = setTimeout(() => fn(...args), delay);
    };
  }
  useEffect(() => {
    document.getElementById("right")?.addEventListener("scroll", handleScroll);
    return () => {
      document.getElementById("right")?.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navArr = [
    { name: "1111", id: "foundation" },
    { name: "2222", id: "stock" },
    { name: "3333", id: "graphic" },
    { name: "4444", id: "commodity" },
  ];
  // 滚动条滚动选中
  const handleScroll = debounce(() => {
    let scrollTop = document.getElementById("right")?.scrollTop as number;
    let section = Array.from(document.querySelector("#right")?.children as any);
    let activeChannel;
    section.map((item: any) => {
      let itemTop = item?.offsetTop;
      if (scrollTop > itemTop - 110) {
        activeChannel = item.id;
      }
    });
    setCurrentId(String(activeChannel));
  }, 100);
  const handleHighlight = (id: string) => {
    let target = document.getElementById(id) as any;
    if (target) {
      // 如果对应id的锚点存在，就跳转到锚点
      // anchorElement.scrollIntoView({ block: "start", behavior: "smooth" });
      target.parentNode.scrollTop = target.offsetTop - target.parentNode.offsetTop;
      setCurrentId(id);
    }
  };
  return (
    <div className={styles.dataScreen}>
      <div className={styles.good_left_icon}>
        <div className={styles.good_left_data}>
          {navArr &&
            navArr.map((item) => {
              return (
                <a key={item.id} onClick={() => handleHighlight(item.id)}>
                  <div className={`${styles.good_left_curr} ${currentId === item.id ? styles.actived : null}`}>
                    {item.name}
                  </div>
                </a>
              );
            })}
        </div>
      </div>
      <div className={styles.goodRight} id="right">
        <div id="foundation" className={styles.goodRightBanner}>
          1
        </div>
        <div id="stock" className={styles.goodRightBanner}>
          2
        </div>
        <div id="graphic" className={styles.goodRightBanner}>
          3
        </div>
        <div id="commodity" className={styles.goodRightBanner}>
          4
        </div>
      </div>
    </div>
  );
};
export default DataScreen;
