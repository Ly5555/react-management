import React from "react";

const Ab = () => {
  // 函数参数的处理
  // 1.可选参数 ?
  const func1: (x: number, y?: number) => number = function (a, b) {
    return a;
  };
  const func2 = function (a: number, b?: number): number {
    return a;
  };
  func2(10);
  func2(10, undefined);
  // 2.剩余参数
  const fun4 = function (...args: any) {
    console.log(args);
  };
  fun4(10, 20, 30, "A");
  const fun5 = function (a: number, b: number, ...args: any[]) {
    console.log(args);
  };
  fun5(10, 20, 30, "A", "7");
  // 3.默认参数
  const func3 = function (a: number = 10, b: number = 20, c: number): number {
    return a + b + c;
  };
  func3(1, 2, 3);
  return <div></div>;
};

export default Ab;
