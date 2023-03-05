import React, { useEffect } from "react";

const TypeScripct = () => {
  // 定义数组一
  let arr: number[] = [1, 2, 3];
  // 定义数组二:泛型
  let arr2: Array<number> = [1, 2, 3];
  // object 表示非原始类型 除了 number、string、boolean之外的类型
  // 定义对象
  let obj: object = {};
  // obj = 13 obj ='' 报错
  // any 任何类型  ts对代码检查 使用
  let anyArr: any[] = [1, 2, 3, "1", null, undefined];
  // void 类型 空值,表示没有任何返回值的函数
  useEffect(() => {
    function name(): void {
      console.log(123);
    }
    name();
    //  console.log(name()); undefind
  }, []);
  interface IPerseon {
    readonly id: number;
    name: string;
    age: number;
  }
  let per: IPerseon = { id: 10, name: "zhangsan", age: 18 };
  // 不是很常用
  interface INewArray {
    [index: number]: number;
  }
  let arrArray: INewArray = [1, 2, 3, 5];
  interface ISearch {
    (a: string, b: string): number;
  }
  const fn1: ISearch = function (a: string, b: string): number {
    return 1;
  };
  // 函数声明和函数表达式

  return (
    <div>
      <h2>数组和对象《引用数据类型》</h2>
      <div>function name() :void 没有返回值</div>
      <h3>类型推断(ts在没有明确的指定类型的时候推测一个类型)</h3>
      定义变量的时候直接给变量赋值则定义类型为对应的类型 let t = 123 number类型 t='' 报错
      <h3>联合类型(表示取值为多种类型中的一种)</h3>
      let l: number | string | boolean = 123
      <h3>对象的类型--接口(首字母大写例如:Person,字母前面加上I) </h3>
      规范：可有可无前面加上? 不能添加没有定义的属性,[propName] 任意属性任意值 只读属性 readonly 只读
      <h3>数组类型</h3>
      <h3>函数类型</h3>
      <h3>函数声明和函数表达式（命名函数 和 函数表达式）</h3>
    </div>
  );
};
export default TypeScripct;
