import React from "react";

function LazyDemo() {


  return (
    <>
      <h3>javascripct知识巩固</h3>
      <div>
        <p>
          const a = d && 1; //
          满足条件赋值：取假运算，从左到右依次判断，遇到假值返回假值，后面不再执行，否则返回最后一个真值{" "}
        </p>
        <p>
          const b = d || 1;// 默认赋值：取真运算，从左到右依次判断，遇到真值返回真值，后面不再执行，否则返回最后一个假值{" "}
        </p>
        <p>const c = !d; //取假赋值：单个表达式转换为true则返回false，否则返回true 处。</p>
        <h2>判断数据了类型</h2>
        <div>{}</div>
      </div>
    </>
  );
}

export default LazyDemo;
