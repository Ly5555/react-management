import React, { useState } from "react";
import { Button, Input } from "antd";
function Lear() {
  const [num1, setNum1] = useState<number>(1);
  const [num2, setNum2] = useState<number>(2);
  const [num3, setNum3] = useState<number>(2);
  let age: number = 18;
  let name: string = "John";
  let isBoolean: boolean = false;
  let un: undefined = undefined;
  let timer: null = null;
  const handeNumberClick = () => {
    setNum3(num1 + num2);
  };
  const handelNum1Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNum1(Number(e.target.value));
  };
  // 组合类型 let 变量: 类型1 | 类型2 | 类型3 .... = 初始值
  let arr1: number | string = "1";
  console.log(typeof arr1);
  // 类型别名
  type s = string | number;
  const str1: s = "abc";
  const str2: number = 1;
  // 数组类型
  // let 变量: 类型[] = [值1，...]:
  let numbers: number[] = [1, 3, 5];
  // let 变量: Array<类型> = [值1，...]
  let strings: Array<string> = ["a", "b", "c"];
  // 函数
  // function 函数名(形参1： 类型=默认值， 形参2：类型=默认值,...): 返回值类型 { }
  // 声明式实际写法:
  function add(num1: number, num2: number): number {
    return num1 + num2;
  }
  // 箭头函数
  //const 函数名（形参1： 类型=默认值， 形参2：类型=默认值, ...):返回值类型 => { }
  const add2 = (a: number = 100, b: number = 100): number => {
    return a + b;
  };
  // 函数返回值类型void 如果一个函数没有返回值，应该使用 void 类型
  // 默认值不能与？在一起
  function mySlice(_begin?: number, _end: number = 10) {}
  // 接口 类型别名type 接口interface
  // interface 接口名 {属性1:类型1，属性2:类型2}
  // 接口和类型的区别
  // 同：都可以为对指定类型，差异：接口只能为对象指定类型（可以继承），类型别名，可以为任意类型指定别名

  // 接口继承 如 interface 接口2 extends 接口1

  return (
    <div>
      基本类型定义： {age},{name},{isBoolean},{un},{timer}
      <Input onChange={handelNum1Change} />
      我是点击后的值：{num3}
      <Button onClick={handeNumberClick}>点击测试</Button>
    </div>
  );
}
export default Lear;
