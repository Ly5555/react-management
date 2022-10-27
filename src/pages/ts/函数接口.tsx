import React from "react";
// 函数接口
/*
为了使用接口表示函数类型,我们需要给接口定义一个调用签名
它就像是一个只有参数列表和返回值类型的函数定义,参数列表里的每个参数都需要名字和类型
*/
function Cc() {
  interface ImakeMoney {
    (salary: number, reward: number): number;
  }
  const sumMoney: ImakeMoney = (x: number, y: number) => x + y;
  console.log(sumMoney(1, 2));

  // 接口与数组
  interface Array {
    [index: number]: string;
  }
  let myArray: Array;
  myArray = ["1", "2", "3"];
  return <div></div>;
}

export default Cc;
