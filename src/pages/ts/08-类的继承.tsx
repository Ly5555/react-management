import React from "react";

const Pa = () => {
  // 类的继承
  class Person {
    name: string;
    age: number;
    constructor(name: string, age: number) {
      this.name = name;
      this.age = age;
    }
    say(): void {
      console.log(1);
    }
  }
  class Parent extends Person {
    score: string;
    constructor(score: string, name: string, age: number) {
      super(name, age);
      this.score = score;
    }
    say(): void {
      console.log(2);
    }
  }
  return <div></div>;
};
export default Pa;
