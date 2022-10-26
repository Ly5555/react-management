import React from "react";

function Enum() {
  enum Gender {
    Male,
    Female,
  }
  let val: Gender;
  val = Gender.Male;
  val = Gender.Female;
  // ts 枚举类型的本质是数值类型,所以赋值不会报错
  val = 0;
  console.log(Gender.Male); // 0
  // ts中枚举类型的取值,默认从0开始,从上向下依次递增
  return <div></div>;
}

export default Enum;
