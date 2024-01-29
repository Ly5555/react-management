/*
 * @Author: Lyq
 * @Date: 2024-01-20 16:04:56
 * @LastEditors: Lyq
 * @LastEditTime: 2024-01-29 21:42:48
 */
/*
主题
*/
import React, { useCallback, useEffect, useState } from "react";
import { Drawer, Space, Switch, Typography } from "antd";
import { SettingOutlined } from "@ant-design/icons";
import { useGlobalStore, useThemeColor } from "@/stores";
import styles from "./theme.module.less";
const Theme = () => {
  const [open, setOpen] = useState(false);
  const { darkMode, setDarkMode } = useGlobalStore();
  useEffect(() => {
    applyTheme(darkMode);
  }, [darkMode]);
  const { Title } = Typography;
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
    // setValues(e.value);
    useThemeColor.setState({ themeColor: e.color });
  };

  /* 暗黑模式 */
  const handelTheme = (checked: boolean) => {
    const newDarkMode = !darkMode;
    applyTheme(newDarkMode);
    setDarkMode(newDarkMode);
  };
  const applyTheme = (isDarkMode: boolean) => {
    document.body.classList.remove(isDarkMode ? "light" : "dark");
    document.body.classList.add(isDarkMode ? "dark" : "light");
  };
  return (
    <div id="driverjs_theme" className={styles.themeBox}>
      <SettingOutlined onClick={showDrawer} style={{ fontSize: 19, marginRight: 16 }} />
      <Drawer title="设置" placement="right" closable={false} onClose={onClose} open={open}>
        <Space direction="vertical">
          <Space>
            <span className={styles.themeTitle}>暗黑模式</span>
            <Switch checkedChildren={<>🌞</>} defaultChecked={darkMode} unCheckedChildren={<>🌜</>} checked={darkMode} onChange={handelTheme} />
          </Space>
          <Space></Space>
        </Space>
      </Drawer>
    </div>
  );
};

export default Theme;
