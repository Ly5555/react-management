/*
主题
*/
import React, { useEffect, useState } from "react";
import { Drawer, Radio, Space, Switch } from "antd";
import { SettingOutlined } from "@ant-design/icons";
import { useThemeColor } from "@/stores";
import styles from "./theme.module.less";
const Theme = () => {
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState<number>(1);
  const [theme, setTheme] = useState("light");
  useEffect(() => {}, []);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const RadioColor: { name: string; color: string; value: number }[] = [
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
    {
      name: "紫红",
      color: "#9E339F",
      value: 3,
    },
    {
      name: "粉色",
      color: "#ED4192",
      value: 4,
    },
    {
      name: "红色",
      color: "#E0282E",
      value: 5,
    },
    {
      name: "橘黄",
      color: "#F4801A",
      value: 6,
    },
    {
      name: "黄色",
      color: "#F2BD27",
      value: 7,
    },
    {
      name: "绿色",
      color: "#00B96B",
      value: 8,
    },
  ];
  const handleRadioChange = (e: { value: number; color: string }) => {
    setValues(e.value);
    useThemeColor.setState({ themeColor: e.color });
  };
  const handelManyTabs = (checked: boolean) => {};
  /* 暗黑模式 */
  const handelTheme = (checked: boolean) => {
    // theme === 'default' ? 'dark' : 'default'
  };
  return (
    <div id="driverjs_theme">
      <SettingOutlined onClick={showDrawer} style={{ fontSize: 19, marginRight: 16 }} />
      <Drawer title="设置" placement="right" closable={false} onClose={onClose} open={open}>
        <Space>
          <h3>是否展示多Tabs:</h3>
          <Switch onChange={handelManyTabs} />
        </Space>
        <div>=============</div>
        <Space>
          <h3>暗黑模式</h3>
          <Switch onChange={handelTheme} />
        </Space>
        <Space>
          <h3>主色:</h3>
          {RadioColor &&
            RadioColor.map((item, index) => {
              return (
                <label
                  key={index}
                  onClick={() => handleRadioChange(item)}
                  className={styles.themeLabel}
                  style={{
                    background: item.color,
                    boxShadow: values === item.value ? `0 0 0 1px #ffffff, 0 0 0 5px ${item.color}` : "",
                  }}>
                  <input
                    type="radio"
                    name="color"
                    value={item.color}
                    style={{
                      width: 0,
                      height: 0,
                      opacity: 0,
                    }}
                  />
                </label>
              );
            })}
        </Space>
      </Drawer>
    </div>
  );
};

export default Theme;
