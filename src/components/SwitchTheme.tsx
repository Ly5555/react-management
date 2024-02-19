/*
 * @Author: Lyq
 * @Date: 2024-01-31 20:24:53
 * @LastEditors: Lyq 
 * @LastEditTime: 2024-01-31 20:29:32
 */

import React, { useEffect } from "react";
import { Switch } from "antd";
import { useGlobalStore } from "@/stores";

const SwitchTheme = () => {
  const { darkMode, setDarkMode,  } = useGlobalStore();
  useEffect(() => {
    applyTheme(darkMode);
  }, [darkMode]);
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
