import React, { useState } from "react";
import { Spin } from "antd";
interface IProps {
  loading: boolean;
  children: any;
}
const Loading = ({ loading, children }: IProps) => {
  // const [loading, setLoading] = useState(false);
  return (
    <div>
      <Spin spinning={loading}>{children}</Spin>
    </div>
  );
};

export default Loading;
