import React from "react";
//接口与类型别名的异同
const Qwef = () => {
  /*
  1.相同点
   都可以描述属性或方法
   都可以扩展
  2.不同点
  type 可以声明基本数据类型,联合类型数组等
  interface只能声明变量
  当出现使用type和interface声明同名的数据时,type会直接报错interface会进行组合
  type不会自动合并 interface会
  */

  type womenStar = {
    name: string;
    age: number;
  };
  interface Iw {
    name: string;
    age: number;
  }
  let star1: womenStar = {
    name: "张三",
    age: 18,
  };
  let star2: Iw = {
    name: "张三2",
    age: 18,
  };
  type money = {
    y1: number;
  };
  type money2 = money & {
    y2: number;
  };
  let salary: money2 = {
    y1: 10,
    y2: 100,
  };

  interface a {
    name: string;
  }
  interface b extends a {
    age: number;
  }
  let starInfo: b = {
    name: "1",
    age: 18,
  };
  return <div></div>;
};

export default Qwef;
