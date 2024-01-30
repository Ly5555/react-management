/*
 * @Author: Lyq
 * @Date: 2024-01-20 16:04:56
 * @LastEditors: Lyq
 * @LastEditTime: 2024-01-30 21:45:08
 */
/*
主题
*/
import React, { useCallback, useEffect, useState } from "react";
import { Button, ColorPicker, Drawer, Space, Switch } from "antd";
import { SettingOutlined } from "@ant-design/icons";
import { useGlobalStore } from "@/stores";
import type { ColorPickerProps } from "antd";
import styles from "./theme.module.less";
const Theme = () => {
  const [open, setOpen] = useState(false);
  const [formatHex, setFormatHex] = useState<ColorPickerProps["format"]>("hex");
  const { darkMode, themeColor, setDarkMode, setThemeColor } = useGlobalStore();
  const presets = [
    {
      label: "推荐",
      colors: [
        "#000000",
        "#000000E0",
        "#000000A6",
        "#00000073",
        "#00000040",
        "#00000026",
        "#0000001A",
        "#00000012",
        "#0000000A",
        "#00000005",
        "#F5222D",
        "#FA8C16",
        "#FADB14",
        "#8BBB11",
        "#52C41A",
        "#13A8A8",
        "#1677FF",
        "#2F54EB",
        "#722ED1",
        "#EB2F96",
        "#F5222D4D",
        "#FA8C164D",
        "#FADB144D",
        "#8BBB114D",
        "#52C41A4D",
        "#13A8A84D",
        "#1677FF4D",
        "#2F54EB4D",
        "#722ED14D",
        "#EB2F964D",
      ],
    },
  ];

  useEffect(() => {
    applyTheme(darkMode);
  }, [darkMode]);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  // 暗黑模式
  const handelTheme = () => {
    const newDarkMode = !darkMode;
    applyTheme(newDarkMode);
    setDarkMode(newDarkMode);
  };
  const applyTheme = (isDarkMode: boolean) => {
    document.body.classList.remove(isDarkMode ? "light" : "dark");
    document.body.classList.add(isDarkMode ? "dark" : "light");
  };
  // 主题颜色
  const handelColorChange = (hex: string) => {
    setThemeColor(hex);
  };
  return (
    <div id="driverjs_theme" className={styles.themeBox}>
      <SettingOutlined onClick={showDrawer} style={{ fontSize: 19, marginRight: 16 }} />
      <Drawer title="设置" placement="right" closable={false} onClose={onClose} open={open}>
        <Space direction="vertical">
          <div className={styles.themeDrawerBox}>
            <span className={styles.themeTitle}>主题颜色:</span>
            <ColorPicker
              showText
              value={themeColor}
              format={formatHex}
              onFormatChange={setFormatHex}
              onChange={(color, hex) => handelColorChange(hex)}
              presets={presets}
            />
          </div>
          <div className={styles.themeDrawerBox}>
            <span className={styles.themeTitle}>重置主题:</span>
            <Button type="primary" onClick={() => setThemeColor("#1677FF")}>
              重置
            </Button>
          </div>
          <div className={styles.themeDrawerBox}>
            <span className={styles.themeTitle}>暗黑模式:</span>
            <Switch
              checkedChildren={<>🌞</>}
              defaultChecked={darkMode}
              unCheckedChildren={<>🌜</>}
              checked={darkMode}
              onChange={handelTheme}
            />
          </div>
        </Space>
      </Drawer>
    </div>
  );
};

export default Theme;
