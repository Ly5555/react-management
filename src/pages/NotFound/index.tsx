import React from "react";
import { Result, Button } from "antd";

import { useNavigate } from "react-router-dom";
const NotFound = () => {
  const navigaiteTo = useNavigate();
  return (
    <div>
      <Result
        status="404"
        title="404"
        subTitle="迷路了"
        extra={
          <Button
            type="primary"
            onClick={() => {
              navigaiteTo("/home/homes");
            }}>
            首页
          </Button>
        }
      />
    </div>
  );
};

export default NotFound;
