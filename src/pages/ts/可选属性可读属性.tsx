import React from "react";

function Abc() {
  // 可选属性 ？  只读属性使用:readonly
  interface myInterface {
    name: string;
    age: number;
    lastName?: string;
  }
  const obj: myInterface = {
    name: "Jerry",
    age: 25,
  };
  interface myAbc {
    readonly name: string;
    readonly age: number;
  }
  let beautry: myAbc = {
    name: "12",
    age: 1,
  };
  //   beautry.name = "20";
  // const 与 beadonly

  return <div></div>;
}

export default Abc;
