import {Button} from "antd";
import React, {useState, useRef, useImperativeHandle, forwardRef} from "react";

const ChilduseImperativeHandle = () => {
  const ref = useRef<any>(null);
  return (
    <div>
      <Button type="primary" onClick={() => ref.current.add()}>
        父组件上的按钮，点击+1
      </Button>
      <Child cRef={ref} name="Tome" />
      <div style={{marginTop: 10}}></div>
      <Button type="primary" onClick={() => ref.current.add()}>
        父第二个的按钮，点击+1
      </Button>
      <Child2 ref={ref} name="jack" />
    </div>
  );
};
const Child = (props: any) => {
  console.log(props);
  const [count, setCount] = useState(0);
  const add = () => {
    setCount(count + 1);
  };
  useImperativeHandle(props.cRef, () => ({
    add,
  }));
  return (
    <>
      <p>点击次数：{count}</p>
      <Button onClick={add}> 子组件的按钮，点击+1</Button>
    </>
  );
};
const Child2 = forwardRef((props: any, ref) => {
  console.log(props);
  const [count, setCount] = useState(0);
  const add = () => {
    setCount(count + 1);
  };
  useImperativeHandle(ref, () => ({
    add,
  }));
  return (
    <>
      <p>2点击次数：{count}</p>
      <Button onClick={add}> 子组件的按钮，点击+1</Button>
    </>
  );
});

const Child4 = (props: any) => {}
   
export default ChilduseImperativeHandle;
