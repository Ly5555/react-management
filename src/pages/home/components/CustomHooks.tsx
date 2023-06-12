import React, {useCallback, useEffect, useRef, useState} from "react";

const CustomHooks = () => {
  return (
    <div>
      <UseSetState />
    </div>
  );
};
const useLatest = <T,>(value: T): {readonly current: T} => {
  const ref = useRef(value);
  ref.current = value;
  return ref;
};
const UseSetState = () => {
  const [count, setCount] = useState(0);
  const ref = useLatest(count);
  // useEffect(() => {
  //   ref.current = count;
  // }, [count]);
  useEffect(() => {
    const interval = setInterval(() => {
      console.log("count:", count);
      console.log("ref:", ref);
      setCount(ref.current + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  return (
    <>
      <div>自定义Hooks：useSetState</div>
      <div>count: {count}</div>
    </>
  );
};
const useSetState = (initialState = {}) => {
  const [state, setState] = useState(initialState);

  const setMergedState = useCallback((newState:any) => {
    setState((prevState) => ({
      ...prevState,
      ...newState,
    }));
  }, []);

  return [state, setMergedState];
};
export default CustomHooks;
