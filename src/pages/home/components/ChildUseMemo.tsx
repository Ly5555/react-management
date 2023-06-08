import React, {useMemo, useState} from "react";
import {Button} from "antd";
const ChildUseMemo = () => {
  const [flag, setFlag] = useState(false);
  const data = usePow([1, 2, 4]);
  return (
    <div>
      <div>数字集合：{JSON.stringify(data)}</div>
      <Button type="primary" onClick={() => setFlag(!flag)}>
        状态切换{JSON.stringify(flag)}
      </Button>
    </div>
  );
};
const usePow = (list: number[]) => {
  return useMemo(
    () =>
      list.map((item: number) => {
        console.log("我是usePow");
        return Math.pow(item, 2);
      }),
    [],
  );
};
export default ChildUseMemo;
