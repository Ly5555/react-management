import React, { memo } from "react";
import { Spin } from "antd";

// 加载中组件
const Loading = () => {
  return (
    <div style={{ textAlign: "center", padding: "50vh 0" }}>
      <Spin />
    </div>
  );
};

export default memo(Loading)
