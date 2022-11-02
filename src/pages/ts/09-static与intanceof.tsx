import React from "react";

const A = () => {
  // static
  class StaticTest {
    static foo: string;
    static say(): void {
      console.log(StaticTest.foo);
    }
  }
  // instcanceof
  class Person {}
  let p = new Person();
  let isPerson = p instanceof Person;

  return <div></div>;
};

export default A;
