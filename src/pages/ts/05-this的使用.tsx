import React from "react";

const This = () => {
  // this 的使用
  let arr = {
    name: "白小明",
    age: 23,
    marry: true,
    show: function () {
      this.marry = false;
    },
  };
  class Rect {
    w: number;
    h: number;
    constructor(w: number, h: number) {
      this.w = w;
      this.h = h;
    }
    getArea() {
      return () => {
        return this.w * this.h;
      };
    }
  }

  return <div></div>;
};

export default This;
