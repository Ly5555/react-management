import React from "react";

function Abc() {
  // 应用场景:解决参数问题
  interface IFullName {
    firstName: string;
    lastName: string;
    age: number;
    singName: string;
  }
  // 少一个或者多个参数问题 使用可选参数
  let a: IFullName = {
    firstName: "这是第一个参数",
    lastName: "第二个参数",
    age: 23,
    singName: "hello",
  };
  // 方案二 多一个参数 不建议使用
  let info = {
    firstName: "这是第一个参数",
    lastName: "第二个参数",
    age: 23,
    singName: "hello",
    male: true,
  };
  let ab: IFullName = info;
  // 使用类型断言
  let info2: IFullName = {
    firstName: "这是第一个参数",
    lastName: "第二个参数",
    age: 23,
    singName: "hello",
    male: true,
  } as IFullName;
  // 使用索引签名
  interface Ibeauty {
    [props: string]: string;
  }
  let name: Ibeauty = {
    name1: "肖恩",
    name2: "莉莉",
    name3: "莉莉",
    name4: "莉莉",
  };
  return <div></div>;
}

export default Abc;
