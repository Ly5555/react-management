import React from "react";

const Qw = () => {
  // 匿名函数
  const makeMoney = function (a: number, b: number) {
    return a + b;
  };
  // 命名函数
  function writeCode(hour: number, sleep: number) {
    return hour;
  }
  // 箭头函数
  const seeMei = (time: number): void => {
    console.log(1);
  };
  type myFun = (x: number, y: number) => number;
  const foo: myFun = (a: number, b: number) => a + b;
  return <div></div>;
};

export default Qw;
