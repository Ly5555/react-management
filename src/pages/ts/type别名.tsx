import React from "react";

function Type() {
  // 类型别名就是给一个类型起一个新名字
  type beautys = "a" | "b" | "c";
  let one: beautys;
  one = "a";
  // 2
  type myFun = (a: string, b: number) => number;
  let func: myFun = (a: string, b: number) => b;

  // 3
  type myInterface = { 
    name: string;
    age: number;
    sex: string;
  };
  let pangzi: myInterface = {
    name: "1",
    age: 2,
    sex: "man",
  };
  return <div></div>;
}

export default Type;
