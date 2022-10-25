import React, { useSyncExternalStore } from "react";
import { combineReducers, createStore } from "redux";
import { Button } from "antd";
// useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
function numberReducer(state = 1, action: { type: any }) {
  switch (action.type) {
    case "ADD":
      return state + 1;
    case "DEL":
      return state - 1;
    default:
      return state;
  }
}
/* 注册reducer */
const rootReducer = combineReducers({ number: numberReducer });
/* 创建 store */
const store = createStore(rootReducer, { number: 1 });
function Hooks() {
  const state = useSyncExternalStore(
    store.subscribe,
    () => store.getState().number
  );
  console.log(state);
  return (
    <div>
      {state}
      <Button onClick={() => store.dispatch({ type: "ADD" })}>点击</Button>
    </div>
  );
}

export default Hooks;
