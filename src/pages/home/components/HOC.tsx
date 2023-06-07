import React, { useState } from "react";
import { Button } from "antd";

const HOC = (Component: any) => (props: any) => {
  return (
    <Component
      name={"大家好，一起玩转Hooks吧！"}
      age={"28"}
      {...props}
    ></Component>
  );
};

const Index: React.FC<any> = (props) => {
  const [flag, setFlag] = useState<boolean>(false);
  return (
    <div>
      <Button type="primary" onClick={() => setFlag(!flag)}>
        获取props
      </Button>
      {flag && <div>{JSON.stringify(props)}</div>}
    </div>
  );
};

export default HOC(Index);
