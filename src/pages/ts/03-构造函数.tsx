import React from "react";

const Abc = () => {
  // 构造函数
  var myFun = new Function("a", "b", "return a *b");
  var x = myFun(4, 3);
  console.log(x);
  // 递归函数
  function sum(arr: number[], n: number): number {
    if (n <= 0) {
      return 0;
    } else {
      return sum(arr, n - 1) + arr[n - 1];
    }
  }
  let arr = sum([4, 3, 2], 3);
  console.log("🚀 ~ file: 03-构造函数.tsx ~ line 17 ~ Abc ~ arr", arr);
  return <div></div>;
};

export default Abc;
