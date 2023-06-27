import React from "react";

const Re = () => {
  class Person {
    name: string;
    age: number;
    constructor(name: string, age: number) {
      this.name = name;
      this.age = age;
    }
    sayHello(): void {
    }
  }

  let a = new Person("Jack", 32);
  return <div></div>;
};

export default Re;
