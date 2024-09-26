/*
 * @Author: Lyq
 * @Date: 2023-09-25 20:14:16
 * @LastEditors: Lyq
 * @LastEditTime: 2023-10-31 21:19:15
 */
import React from "react";

interface IProps {
  data: {
    name: string;
    age: number;
    cardType: string;
  };
}
const Son = (props: IProps) => {
  const { data } = props || {};
  const { name, age } = data || {};
  return (
    <>
      <div>
        123
        {name},{age}
      </div>
    </>
  );
};

export default Son;
