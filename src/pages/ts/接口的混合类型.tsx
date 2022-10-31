import React from "react";

const Abcd = () => {
  // 接口的混合类型
  interface Counter {
    (start: number): string;
    interval: number;
    reset(): void;
  }
  // 类型断言
  //1. <类型>名称 2.名称 as 类型
  function getCounter(): Counter {
    let counter = function (start: number) {} as Counter;
    counter.interval = 123;
    counter.reset = function () {};

    return counter;
  }
  getCounter();
  return <div></div>;
};

export default Abcd;
