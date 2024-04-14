/*
 * @Author: Lyq
 * @Date: 2024-01-31 20:24:53
 * @LastEditors: Lyq
 * @LastEditTime: 2024-04-14 20:31:06
 */

import React from "react";
import { Switch } from "antd";
import { useGlobalStore } from "@/stores";

const SwitchTheme = () => {
  const { darkMode, setDarkMode } = useGlobalStore();
  // 暗黑模式
  const handelTheme = (checked: boolean) => {
    document?.querySelector("html")?.setAttribute("data-theme", checked ? "dark" : "light");
    setDarkMode(checked);
  };
  return (
    <>
      <Switch
        checkedChildren={<>🌞</>}
        defaultChecked={darkMode}
        unCheckedChildren={<>🌜</>}
        checked={darkMode}
        onChange={handelTheme}
      />
    </>
  );
};

export default SwitchTheme;
