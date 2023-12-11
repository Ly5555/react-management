/*
 * @Author: liuyongqing
 * @Date: 2023-09-05 20:13:07
 * @LastEditors: liuyongqing
 * @LastEditTime: 2023-12-11 20:17:34
 */
import { Button, Checkbox, Input } from "antd";
import React, { createContext, useContext, useState } from "react";
interface IProps {
  flag: boolean;
  getNumber: (value: number) => void;
}
//主题颜色
const theme = {
  dark: {
    color: "#5B8FF9",
    background: "#5B8FF9",
    border: "1px solid #5B8FF9",
    type: "dark",
    buttomType: "primary",
  },
  light: {
    color: "#E86452",
    background: "#E86452",
    border: "1px solid #E86452",
    type: "light",
    buttomType: "default",
  },
};
const ThemeContext: any = createContext(0);
const ParentSon = () => {
  const [flag, setFlag] = useState(true);
  const [number, setNumber] = useState<number>(0);
  const [themeContextValue, setThemeContext] = useState(theme.dark);
  return (
    <>
      <div>我是父组件</div>
      <Button type="primary" onClick={() => setFlag((v) => !v)}>
        切换状态
      </Button>
      <div>子组件的number：{number}</div>
      <Child
        flag={flag}
        getNumber={(v: number) => {
          setNumber(v);
        }}
      />
      {/* 主题切换 */}
      <ThemeContext.Provider value={{ ...themeContextValue, setTheme: setThemeContext }}>
        <ContextChild />
      </ThemeContext.Provider>
    </>
  );
};
// 父子通信
const Child = (props: IProps) => {
  const { flag, getNumber } = props || {};
  const [number, setNumber] = useState<number>(0);
  return (
    <div style={{ border: "1px solid #000", padding: 20, margin: 10 }}>
      <h3>我是子组件</h3>
      <div>父组件传递的flag:{JSON.stringify(flag)}</div>
      <Button
        type="primary"
        onClick={() => {
          const res = number + 1;
          setNumber(res);
          getNumber(res);
        }}>
        点击加一{number}
      </Button>
    </div>
  );
};
// contextChild
const ContextChild = (props: any) => {
  const { border, setTheme, color, type, buttomType }: any = useContext(ThemeContext);
  return (
    <div style={{ border, color, padding: 20 }}>
      <div>
        <span> 选择主题： </span>
        <Checkbox name="dark" style={{ color }} checked={type === "dark"} onChange={() => setTheme(theme.dark)}>
          主题1
        </Checkbox>
        <Checkbox name="light" style={{ color }} checked={type === "light"} onChange={() => setTheme(theme.light)}>
          主题2
        </Checkbox>
      </div>
      <div style={{ marginTop: 8 }}>
        <Input placeholder="请输入你的名字" style={{ color, border, marginBottom: 10 }} />
        <Button type={buttomType}>提交</Button>
      </div>
    </div>
  );
};
export default ParentSon;
