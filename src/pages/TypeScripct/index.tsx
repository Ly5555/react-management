import React, {useEffect} from "react";
import styles from "./css/index.module.less";
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
  let per: IPerseon = {id: 10, name: "zhangsan", age: 18};
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
  //可选参数和默认参数  ? 可有可无
  let getName = function (name: string = "李", age?: string): string {
    return name + age;
  };
  // 剩余参数
  function name(x: string, ...args: number[]) {
    console.log(x, args);
  }
  name("zhangsan", 1, 2, 3);
  // 函数重载 函数名字相同,形参不同的多个函数
  const newAdd = (a: number | string, b: number | string): string | number => {
    if (typeof a === "string" && typeof b === "string") {
      return a + b;
    } else if (typeof a === "number" && typeof b === "number") {
      return a + b;
    }
    return 1;
  };
  // 类型别用 常用于联合类型
  type all = string | number | boolean;
  let str: all = "123";
  let str2: all = 123;
  let str3: all = true;
  type stringType = "张三" | "李四" | "王五";
  let nameS: stringType = "张三";

  return (
    <div className={styles.typescripct}>
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
      <h3>可选参数和默认参数</h3>
      必须参数不能位于可选参数后面
      <h3>剩余参数</h3>
      主要用Es6 ...rest
      <h3> 函数重载 函数名字相同,形参不同的多个函数</h3>
      <h3>类型断言</h3>
      第一种 as 第二种 {"<类型>"} 变量 将任何一个类型为any,尽量不使用any
      {((window as any).a = 10)}
      <h2>类型别名,常用于联合类型</h2>
      <h2>字符串字面量类型，用来约束取值只能是某几个字符串中的一个</h2>
    </div>
  );
};
export default TypeScripct;
