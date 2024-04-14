/*
 * @Author: Lyq
 * @Date: 2024-01-20 16:04:56
 * @LastEditors: Lyq
 * @LastEditTime: 2024-04-14 20:27:30
 */

import React, { useEffect, useState } from "react";
import { Button, ColorPicker, Drawer, Space } from "antd";
import { SkinOutlined } from "@ant-design/icons";
import { useGlobalStore } from "@/stores";
import { SwitchTheme } from "@/components";
import type { ColorPickerProps } from "antd";
import styles from "./theme.module.less";

const Theme = () => {
  const [open, setOpen] = useState(false);
  const [formatHex, setFormatHex] = useState<ColorPickerProps["format"]>("hex");
  const { themeColor, darkMode, setThemeColor } = useGlobalStore();
  useEffect(() => {
    applyTheme(darkMode);
  }, []);
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

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const applyTheme = (isDarkMode: boolean) => {
    document?.querySelector("html")?.setAttribute("data-theme", isDarkMode ? "dark" : "light");
  };

  // 主题颜色
  const handelColorChange = (hex: string) => {
    setThemeColor(hex);
  };
  return (
    <div id="driverjs_theme" className={styles.themeBox}>
      <SkinOutlined onClick={showDrawer} style={{ fontSize: 19, marginRight: 16 }} />
      <Drawer title="设置🎨" placement="right" closable={false} onClose={onClose} open={open}>
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
            <SwitchTheme />
          </div>
        </Space>
      </Drawer>
    </div>
  );
};

export default Theme;
