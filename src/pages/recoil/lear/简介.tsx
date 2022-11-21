import React from "react";
import { useRecoilStateLoadable, useSetRecoilState } from "recoil";

const Deac = () => {
  // 只能在函数组件中使用
  /*
  1.初始状态 RecoilRoot
  2.定义状态 atom ｜ selector 
  3.使用状态 Recoil Hooks
 钩子
声明状态
 const recoilState = atom ｜ atomFamily ｜ selector ｜ selectotFamily
读和写
const [stateValue,setStateValue] =  (recoilState)
只读
const stateValue = useRecoilValue(recoilState)
只写
const setStateValue = useSetRecoilState(recoilState)
重置状态
const resetStateValue = useResetRecoilState(recoilState)
查看状态
useGetRecoilValueInfo_UNSTABLE()
刷新状态
useRecoilRefresher_UNSTABLE()
最常用的3个钩子
  */



/*
异步
loadable
loadable.state(loading | hasValue | hasError )
loadable.contents 
// 读和写
const [loadable,setState] = useRecoilStateLoadable()
读
useRecoilValueLoadable
*/


  return <div></div>;
};

export default Deac;
