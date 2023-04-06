import { Button, Space } from "antd";
import React, { useState, useEffect, memo } from "react";
import { ChildMemo } from "./index";
//  react Hoooks的学习
const HooksMemo = () => {
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const handleClick = () => {
    setCount(count + 1);
    setLoading(true);
    // 模拟数据加载
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  return (
    <div>
      <div>父组件:{count}</div>
      {loading && (
        <div className="local-loading">
          <div className="spinner"></div>
          <p>数据加载中...</p>
        </div>
      )}
      <Space>
        <Button type="primary" onClick={handleClick}>
          useMemo子组件不会渲染
        </Button>
        <Button type="primary" onClick={handleClick}>
          子组件不会渲染
        </Button>
      </Space>
      <h3>如果你希望你的组件props没变化的时候就不重新渲染，React.memo</h3>
        <ChildMemo count={count} />
    </div>
  );
};

export default HooksMemo;
