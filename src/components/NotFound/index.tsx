/*
 * @Author: Lyq
 * @Date: 2023-08-29 21:42:01
 * @LastEditors: Lyq
 * @LastEditTime: 2024-01-04 21:46:23
 */
import React from "react";
import { Result, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { HOME_URL } from "@/config/config";
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
              navigaiteTo(HOME_URL);
            }}>
            首页
          </Button>
        }
      />
    </div>
  );
};

export default NotFound;
