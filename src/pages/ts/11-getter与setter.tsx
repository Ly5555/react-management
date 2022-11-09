import React from "react";
/*
只读
*/
const Abc = () => {
  class GetNameClass {
    private _fullName: string = "张三";
    // 需求：我们就像在外部进行修改_fullName 那怎么办
    get fullName(): string {
      return this._fullName;
    }
    set fullName(newName: string) {
      this._fullName = newName;
    }
  }
  let startname = new GetNameClass();
  startname.fullName = "李四";
  console.log(startname.fullName);

  return <div></div>;
};

export default Abc;
