/*
主题
*/
import React, { useState } from "react";
import { Drawer, Radio, Space, Switch } from "antd";
import { SettingOutlined } from "@ant-design/icons";
import { useSetRecoilState } from "recoil";
import { themeColor, algorithm } from "@/store/store";
import styles from "../css/theme.module.less";
const Theme = () => {
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState<number>(1);
  const useThemeColor = useSetRecoilState(themeColor);
  const useColorPrimary = useSetRecoilState(algorithm);
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
  const handleRadioChange = (e: { value: number, color: string }) => {
    setValues(e.value);
    useThemeColor(e.color);
  };
  const handeleThemeColor = (checked: boolean) => {
    useColorPrimary(checked ? 'light' : "dark")
  };
  return (
    <>
      <SettingOutlined onClick={showDrawer} style={{ fontSize: 19, marginRight: 16 }} />
      <Drawer title="修改主题" placement="right" closable={false} onClose={onClose} open={open}>
        <Space>
          <h3>主题:</h3>
          <Switch
            className="dark"
            checkedChildren={<>🌞</>}
            unCheckedChildren={<>🌜</>}
            onChange={handeleThemeColor}
          />
        </Space>
        <div>=============</div>
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
                  }}
                >
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
    </>
  );
};

export default Theme;
