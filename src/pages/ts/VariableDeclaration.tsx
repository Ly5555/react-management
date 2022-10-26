import React from "react";

function VariableDeclaration() {
  // 遍历声明方式
  // var || let  || const 常量

  // 数组结构
  let goddess = ["a", "b", "c"];
  let [first, second] = goddess;
  console.log(first); // a
  console.log(second); // b

  let [third, ...rest] = ["ab", "cd", "ef", "建模"];
  console.log(third); // "ab"
  console.log(rest); // ["cd", "ef", "建模"];

  let [, fourth, , fiifth] = [1, 2, 3, 4];
  console.log(fourth); // 2;
  console.log(fiifth); // 4
  // 对象的结构
  let beauty = { name: "二狗", age: 10, sex: "女" };
  let { name, age } = beauty;
  console.log(name); // "二狗"
  console.log(age); // 10

  return <div></div>;
}

export default VariableDeclaration;
