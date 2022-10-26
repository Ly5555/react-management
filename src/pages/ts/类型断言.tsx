import React from "react";

function Abc() {
  // 类型断言
  let str = "今天是星期三,if else 两颗小星星";
  // 方式一
  let len = (str as string).length;
  return <div></div>;
}

export default Abc;
