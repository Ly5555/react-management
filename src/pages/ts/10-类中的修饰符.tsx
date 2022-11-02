import React from "react";

const P = () => {
  /*
  public    默认  公有 可以在任何地方被访问
  protected 受保护 可以被其自身以及子类访问
  private 私有 只能被其定义所在的类访问
  readonly 可以使用 readonly关键字将属性设置为只读的,只读属性必须在声明时或者构造函数里初始化
  */
  class Person {
    public name: string;
    protected age: number;
    private sex: string;
    constructor(name: string, age: number, sex: string) {
      this.age = age;
      this.name = name;
      this.sex = sex;
    }
    say(): void {
      console.log(1);
    }
  }
  let p = new Person("A", 18, "female");
  p.say();
  class Student extends Person {
    score: string;
    constructor(name: string, age: number, sex: string, score: string) {
      super(name, age, sex);
      this.score = score;
    }
    show(): void {
      console.log(this.name, this.age, this.score);
    }
  }
  class PrintConsole {
    readonly stu: string = "1,2,3,4";
    readonly str2: string;
    readonly ste3: string;
    readonly str4: string;
    constructor(str2: string, ste3: string, str4: string) {
      this.str2 = str2;
      this.ste3 = ste3;
      this.str4 = str4;
    }
  }
  let a = new PrintConsole("1", "2", "3");
  return <div></div>;
};

export default P;
