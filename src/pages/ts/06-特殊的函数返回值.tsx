import React from "react";

const Abc = () => {
  // 如果使用类型别名,定义了一个返回值为void的类型，我们在函数使用的时候，并非一定不能有返回值
  // 相反,如果我们在函数中写了返回值,我们的返回值是有效的
  // 如果我们定义函数的时候明确指出返回值为void,那么我们将除undefined和null以外的值进行返回都会进行报错

  // 在类型别名中指定函数返回值为void,我们可以强行给他返回值，这个返回值是有效的

  type VoidFunc = () => void;
  let fun1: VoidFunc = () => console.log("fun1");

  // 在函数指定返回值为void
  function fun2(): void {
    // return  "fun2";
  }

  return <div></div>;
};

export default Abc;
