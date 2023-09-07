/*
 * @Author: liuyongqing
 * @Date: 2023-09-05 21:10:02
 * @LastEditors: liuyongqing
 * @LastEditTime: 2023-09-06 21:08:27
 */
import { Button, Input } from "antd";
import React, { useCallback, useReducer, useState } from "react";
import { useCopy } from "@/hooks/index";

const ChildHooks = () => {
  const [value, setValue] = useState<string>();
  const [copyText, copy] = useCopy();
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div style={{ border: "1px solid #000", padding: 20, margin: 10 }}>
        useReducer: <ChildReducer />
      </div>
      <div style={{ border: "1px solid #000", padding: 20, margin: 10 }}>
        useCopy:
        <Input
          style={{ display: "inline-block", width: 240, marginRight: 8 }}
          value={value}
          onChange={(v) => setValue(v.target.value)}
        />
        <Button type="primary" onClick={() => copy(value || "")}>
          复制
        </Button>
        <div>{copyText ? `复制结果: ${copyText}` : ""}</div>
      </div>
      <div style={{ border: "1px solid #000", padding: 20, margin: 10 }}>3</div>
      <div style={{ border: "1px solid #000", padding: 20, margin: 10 }}>4</div>
    </div>
  );
};
const ChildReducer = () => {
  const [count, dispatch] = useReducer((state: number, action: any) => {
    switch (action?.type) {
      case "add":
        return state + action?.payload;
      case "sub":
        return state - action?.payload;
      default:
        return state;
    }
  }, 0);
  return (
    <>
      <div>count：{count}</div>
      <Button type="primary" onClick={() => dispatch({ type: "add", payload: 1 })}>
        加1
      </Button>
      <Button type="primary" style={{ marginLeft: 10 }} onClick={() => dispatch({ type: "sub", payload: 1 })}>
        减1
      </Button>
      <Button type="primary" style={{ marginLeft: 10 }} onClick={() => dispatch({ type: "no", payload: 1 })}>
        无关按钮
      </Button>
    </>
  );
};

export default ChildHooks;
