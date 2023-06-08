import {Button} from "antd";
import React, {memo, useCallback, useState} from "react";

const ChilduseCallback = () => {
  let [count, setCount] = useState(0);
  let [flag, setFlag] = useState(true);
  const add = useCallback(() => {
    setCount(count + 1);
  }, [count]);
  return (
    <div>
      <TestButton onClick={() => setCount((v) => v + 1)}>普通点击</TestButton>
      <TestButton onClick={add}>useCallback点击</TestButton>
      <div>数字：{count}</div>

      <Button type="primary" onClick={() => setFlag((v) => !v)}>
        切换{JSON.stringify(flag)}
      </Button>
    </div>
  );
};
const TestButton = memo(({children, onClick = () => {}}: any) => {
  console.log(children);
  return (
    <Button type="primary" onClick={onClick} style={children === "useCallback点击" ? {marginLeft: 10} : undefined}>
      {children}
    </Button>
  );
});
export default ChilduseCallback;
