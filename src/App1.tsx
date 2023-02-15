import React, { lazy, Suspense, useState } from "react";
import "./app.less";
const LazyDemo = lazy(() => import("@/components/LazyDemo"));
import { Demo, Demo2 } from "@/components";
import Lear from "./pages/lear/Lear";
import Recoil from "./pages/recoil/index";
import "./app.css";
function App() {
  const [count, setCounts] = useState("");
  const onChange = (e: any) => {
    setCounts(e.target.value);
  };
  const [show, setShow] = useState(false);
  // 点击事件中动态引入css, 设置show为true
  const onClick = () => {
    setShow(true);
  };

  return (
    <>
      <h2 onClick={onClick}>webpack5+react+ts</h2>
      <Demo />
      <input type="text" value={count} onChange={onChange} />
      <br />
      {/* show为true时加载LazyDemo组件 */}
      {show && (
        <Suspense fallback={null}>
          <LazyDemo />
        </Suspense>
      )}

      <Recoil />
    </>
  );
}
export default App;
