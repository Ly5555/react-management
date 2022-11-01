import React from "react";

const Abc = () => {
  // 函数重载
  //1. 不使用函数重载
  function add(a: number, b: number) {
    return a + b;
  }
  add(1, 2);
  function add2(a: string, b: string) {
    return a + b;
  }
  add2("1", "@ ");
  function add3(a: number | string, b: number | string) {
    // return a + b;
    if (typeof a === "number" && typeof b === "number") {
      return a + b;
    }
    if (typeof a === "string" && typeof b === "string") {
      return a + b;
    }
  }
  function add4(a: number, b: number): number;
  function add4(a: string, b: string): string;
  function add4(a: any, b: any): any {
    return a + b;
  }
  // 定义参数类型与参数数量不同
  function add5(str: string): void;
  function add5(n1: number, s1: string): void;

  function add5(str: any, y?: any): void {}
  return <div></div>;
};

export default Abc;
