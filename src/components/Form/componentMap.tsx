/*
 * @Author: Lyq
 * @Date: 2024-01-06 20:54:29
 * @LastEditors: Lyq
 * @LastEditTime: 2024-01-06 21:01:51
 */
import React from "react";
import { Input } from "antd";
import { ApiAllSelect, NormalSelect, SimpleSelect } from "@/components/Select";
const componentMap = new Map();
componentMap.set("Input", Input);
// componentMap.set("RangePicker", BasicRangePicker);
componentMap.set("ApiAllSelect", ApiAllSelect);
componentMap.set("NormalSelect", NormalSelect);
componentMap.set("SimpleSelect", SimpleSelect);

const GetComponent = (item: any) => {
  const { component, componentProps, params } = item;
  const Comp = componentMap.get(component);

  // 获取组件失败直接返回空标签
  if (!Comp) return <></>;
  return (
    <>
      {params ? <Comp {...params} {...componentProps} /> : <Comp {...componentProps} />}
      {item.unit && <span>{item.unit}</span>}
    </>
  );
};
export default GetComponent;
