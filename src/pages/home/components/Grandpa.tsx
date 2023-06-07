import React, {useState, createContext, useContext} from "react";
import {Button} from "antd";
const CountContext = createContext(0);
const Grandpa = () => {
  const [count, setCount] = useState(0);
  return (
    <>
      <div>父组件的count:{count}</div>
      <Button type="primary" onClick={() => setCount((v) => v + 1)}>
        点击+1(useContext)
      </Button>
      <CountContext.Provider value={count}>
        <Child />
        <Son />
      </CountContext.Provider>
    </>
  );
};
const Child = () => {
  const count = useContext(CountContext);
  return <div>子组件获取到的count: {count}</div>;
};
const Son = () => {
  const count = useContext(CountContext);
  return <div>孙组件获取到的count: {count}</div>;
};

export default Grandpa;
