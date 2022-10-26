import React from "react";
function Interface() {
  /*
  接口用来定义一个类结构,也可以当成类型声明来使用
  接口可以再定义类的时候去限制类的结构
  接口中的属性不能有实际的值,所有的方法都是抽象方法
   */
  interface myInterface {
    name: string;
    age: number;
  }
  const obj: myInterface = {
    name: "Jerry",
    age: 25,
  };
  function say({ name, age }: myInterface): void {
    console.log(name, age);
  }
  return <div>{obj.age}</div>;
}

export default Interface;
