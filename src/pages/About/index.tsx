import { Checkbox } from "antd";
import React, { useState } from "react";

const index = () => {

  const [{ isWarning, isOvertime, isNormal }, setInfoWaring] = useState({
    isWarning: true,
    isOvertime: false,
    isNormal: false,
  });
  const options = [
    {
      label: "即将超时订单",
      value: "isWarning",
    },
    {
      label: "已超时订单",
      value: "isOvertime",
    },
    {
      label: "正常订单",
      value: "isNormal",
    },
  ];
  const handleCheckChange = (checkedValues:any) => {
    let isWarning = checkedValues.includes("isWarning");
    let isOvertime = checkedValues.includes("isOvertime");
    let isNormal = checkedValues.includes("isNormal");
    setInfoWaring({ isWarning, isOvertime, isNormal });
  };
  return (
    <div>
      <Checkbox.Group options={options} defaultValue={["Apple"]} onChange={handleCheckChange} />
    </div>
  );
};

export default index;
