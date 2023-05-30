import React, {Children, useEffect, useState} from "react";
import {HooksMemo, PieChat, LoadingModal} from "./components";
import {Button} from "antd";
import ReactDOM from "react-dom";

//  react Hoooks的学习
function Home() {
  const [number, setNumber] = useState(0);
  useEffect(() => {
    console.log("监听number变化，此时的number是:  " + number);
  }, [number]);
  const handleClick = () => {
    setNumber(prev => prev + 1
    );
  };
  const HomeProps = {
    name:"Home",
    age:21,
    mes:'let us learn React !'
  }
  return (
    <>
      <h3>React学习和antV</h3>
      <Button onClick={handleClick}>{number}</Button>
      <HooksMemo />
      <PieChat />
      <LoadingModal />
      <Father>
       <Son  name="alien"  age="28"  />
      </Father>
    </>
  );
}
const Father=(props:any)=>{
 return props.children
}
function Son(props:any){
  console.log(props,"39")
  return <div> hello,world </div>
}
export default Home;