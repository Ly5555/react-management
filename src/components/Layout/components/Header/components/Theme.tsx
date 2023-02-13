/*
主题
*/
import React, { useState } from "react";
import { Drawer, Radio, Space } from "antd";
import { SettingOutlined } from "@ant-design/icons";
import styles from "../css/theme.module.less";
// SkinOutlined
const Theme = () => {
  const [open, setOpen] = useState(true);
  const [value, setValue] = useState(1);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const RadioColor = [
    {
      name: "蓝色",
      color: "#1677FF",
      value: 1,
    },
    {
      name: "紫色",
      color: "#5A54F9",
      value: 2,
    },
  ];
  const colorStyles = {
    display: "inline-block",
    marginRight: 8,
    height: "16px",
    lineHeight: "16px",
    verticalAlign: "middle",
  };

  const radioStyle1 = {
    ...colorStyles,
    borderColor: "#1890ff",
    // backgroundColor:"#1890ff"
  };
  const radioStyle2 = {
    ...colorStyles,
    borderColor: "#52c41a",
  };
  const radioStyle3 = {
    ...colorStyles,
    borderColor: "#f50",
  };
  const onChange = (e: any) => {
    setValue(e.target.value);
    console.log(e.target.value);
  };
  return (
    <>
      <SettingOutlined onClick={showDrawer} style={{ fontSize: 19, marginRight: 16 }} />
      <Drawer title="修改主题" placement="right" closable={false} onClose={onClose} open={open}>
        <Radio.Group>
       
        </Radio.Group>
      </Drawer>
    </>
  );
};


export default Theme;
