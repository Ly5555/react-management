import React, { lazy, Suspense, useState } from "react";
const LazyDemo = lazy(() => import("@/components/LazyDemo"));
import { Demo, Demo2 } from "@/components";
function App() {
  const [count, setCounts] = useState("");
  const onChange = (e: any) => {
    setCounts(e.target.value);
  };
  const [show, setShow] = useState(false);

  // 点击事件中动态引入css, 设置show为true
  const onClick = () => {
    import("./app.css");
    setShow(true);
  };

  return (
    <>
      <h2 onClick={onClick}>webpack5+react+ts</h2>
      <Demo />
      <p>受控组件</p>
      <input type="text" value={count} onChange={onChange} />
      <br />
      <p>非受控组件</p>
      <input type="text" />
      {/* show为true时加载LazyDemo组件 */}
      {show && (
        <Suspense fallback={null}>
          <LazyDemo />
        </Suspense>
      )}
    </>
  );
}
export default App;
