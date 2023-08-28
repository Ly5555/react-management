/**
 * @author        liuyongqing
 * @date          2023-08-28 10:36:10
 * Copyright © YourCompanyName All rights reserved
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
    <div>
      {name},{age}
    </div>
  );
};

export default Son;
