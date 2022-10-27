import React from "react";
// 接口的继承
function Dd() {
  interface Ip {
    age: number;
  }
  interface IpName extends Ip {
    name: string;
  }
  let a: IpName = {
    name: "1",
    age: 1,
  };
  // 多继承
  interface Ifather {
    m1: number;
  }
  interface Imather {
    m2: number;
  }
  interface Ison extends Ifather, Imather {
    s: number;
  }
  let money: Ison = {
    m1: 100,
    m2: 200,
    s: 200,
  };
  // 多继承
  interface Ifather1 {
    m1: number;
  }
  interface Imather2 {
    m2: string;
  }
  interface Ison1 extends Ifather1, Imather2 {
    s: number;
  }
  let money1: Ison1 = {
    m1: 100,
    m2: "2",
    s: 200,
  };

  return <div></div>;
}

export default Dd;
