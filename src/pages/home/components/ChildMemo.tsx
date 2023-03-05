import React, { memo } from "react";
interface Icount {
  count: number;
}
const ChildMeme = ({ count }:Icount) => {
  console.log("我是useMemo子组件");
  return (
    <div>
      {`${"child"}`}
      <div>测试有meme和没有memo的区别:{count}</div>
    </div>
  );
};

export default memo(ChildMeme);
