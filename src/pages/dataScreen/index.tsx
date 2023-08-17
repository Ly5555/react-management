import React, { useEffect, useState } from "react";
import dayjs from "dayjs";

import styles from "./index.module.less";
import { Anchor } from "antd";

const DataScreen = () => {
  const topRef = React.useRef<HTMLDivElement>(null);
  const [targetOffset, setTargetOffset] = useState<number>();
  useEffect(() => {
    setTargetOffset(topRef.current?.clientHeight);
  }, []);
  return (
    <div className={styles.dataScreen}>
      <Anchor
        targetOffset={targetOffset}
        items={[
          {
            key: "part-1",
            href: "#part-1",
            title: "Part 1",
          },
          {
            key: "part-2",
            href: "#part-2",
            title: "Part 2",
          },
          {
            key: "part-3",
            href: "#part-3",
            title: "Part 3",
          },
        ]}
      />
      <div className={styles.dataScreen_right}>
        <div className={styles.dataScreen_right_box} id="part-1">Part 1</div>
        <div className={styles.dataScreen_right_box} id="part-2">Part 2</div>
        <div className={styles.dataScreen_right_box} id="part-3">Part 3</div>
      </div>
    </div >
  );
};
export default DataScreen;
