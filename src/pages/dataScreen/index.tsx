import React, { useEffect, useState, useRef } from "react";
import request from "@/utils/request/request";
import scrollTo from "antd/lib/_util/scrollTo";
import getScroll from "antd/lib/_util/getScroll";
import styles from "./index.module.less";

const sharpMatcherRegex = /#(\S+)$/;
export type AnchorContainer = HTMLElement | Window;
const DataScreen = () => {
  return <>123</>;
  const [currentId, setCurrentId] = useState("aaaa");
  const [detail, setDetail] = useState({});
  const animating = useRef(false);
  const getDetail = async () => {
    const { data } = await request({
      url: "https://www.fastmock.site/mock/302854084413bb6592dc4c53c7f85991/admin/detail",
      method: "post",
    });
    console.log(data);
  };
  useEffect(() => {
    document.getElementById("right")?.addEventListener("scroll", handleScroll);
    return () => {
      document.getElementById("right")?.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navArr = [
    { name: "基础信息", id: "aaaa" },
    { name: "价格库存", id: "bbbb" },
    { name: "图文信息", id: "cccc" },
    { name: "商品资质", id: "dddd" },
  ];
  const handleScrollClick = (id: string) => {
    let targetOffset = 0;
    setCurrentId(id);
    const container = document.getElementById("right") || window;
    const scrollTop = getScroll(container, true);
    const sharpLinkMatch = sharpMatcherRegex.exec(`#${id}`);
    if (!sharpLinkMatch) {
      return;
    }
    const targetElement = document.getElementById(sharpLinkMatch[1]);
    if (!targetElement) {
      return;
    }
    const eleOffsetTop = getOffsetTop(targetElement, container);
    let y = scrollTop + eleOffsetTop;
    y -= targetOffset !== undefined ? targetOffset : 0;
    animating.current = true;
    scrollTo(y, {
      getContainer: getContainer as any,
      callback: () => {
        animating.current = false;
      },
    });
  };
  const getOffsetTop = (element: HTMLElement, container: AnchorContainer) => {
    if (!element.getClientRects().length) {
      return 0;
    }
    const rect = element.getBoundingClientRect();
    if (rect.width || rect.height) {
      if (container === window) {
        container = element.ownerDocument!.documentElement!;
        return rect.top - container.clientTop;
      }
      return rect.top - (container as HTMLElement).getBoundingClientRect().top;
    }

    return rect.top;
  };
  const getContainer = () => {
    return document.getElementById("right");
  };
  // 滚动条滚动选中
  const handleScroll = () => {
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
  };
  return (
    <div className={styles.dataScreen}>
      <div className={styles.good_left_icon}>
        <div className={styles.good_left_data}>
          {navArr &&
            navArr.map((item) => {
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
      <div className={styles.goodRight} id="right">
        <div id="aaaa" className={styles.goodRightBanner}>
          1
        </div>
        <div id="bbbb" className={styles.goodRightBanner}>
          2
        </div>
        <div id="cccc" className={styles.goodRightBanner}>
          3
        </div>
        <div id="dddd" className={styles.goodRightBanner}>
          4
        </div>
      </div>
    </div>
  );
};
export default DataScreen;
