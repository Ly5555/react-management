/*
主题
*/
import React, { useState } from "react";
import { Drawer, Button } from "antd";
import { SkinOutlined,SettingOutlined } from "@ant-design/icons";
// SkinOutlined
const Theme = () => {
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
    {/* <SettingOutlined /> */}
      <SettingOutlined onClick={showDrawer} style={{ fontSize: 19,marginRight:16 }} />
      <Drawer title="Basic Drawer" placement="right" closable={false} onClose={onClose} open={open}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
    </>
  );
};

export default Theme;
