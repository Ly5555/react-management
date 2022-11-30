import React, { useState, useEffect } from "react";
import { Menu } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import type { MenuProps } from "antd";
import * as Icons from "@ant-design/icons";

const LayoutMenu = () => {
  const navigaiteTo = useNavigate();
  const [menuList, setmenuList] = useState<MenuItem[]>([]);
  useEffect(() => {
    try {
      axios
        .get(
          "https://www.fastmock.site/mock/302854084413bb6592dc4c53c7f85991/admin/menu/list"
        )
        .then((res) => {
          const { data } = res.data;
          setmenuList(deepLoopMenu(data));
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {}
  }, []);

  // 动态Icon处理
  const customIcons: { [key: string]: any } = Icons;
  const addIcon = (name: string) => {
    return React.createElement(customIcons[name]);
  };
  type MenuItem = Required<MenuProps>["items"][number];
  const getItem = (
    label: React.ReactNode,
    key: React.Key | null,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: "group"
  ): MenuItem => {
    return {
      key,
      icon,
      children,
      label,
      type,
    } as MenuItem;
  };
  const handelChangeClick: MenuProps["onClick"] = ({
    key,
  }: {
    key: string;
  }) => {
    navigaiteTo(key);
  };
  // 处理路由
  const deepLoopMenu = (
    menuList: Menu.MenuOptions[],
    newArr: MenuItem[] = []
  ) => {
    menuList?.forEach((item) => {
      if (!item?.children?.length)
        return newArr.push(getItem(item.title, item.path, addIcon(item.icon!)));
      newArr.push(
        getItem(
          item.title,
          item.path,
          addIcon(item.icon!),
          deepLoopMenu(item.children)
        )
      );
    });
    return newArr;
  };

  return (
    <div>
      <Menu
        theme="dark"
        mode="inline"
        items={menuList}
        onClick={handelChangeClick}
      />
    </div>
  );
};

export default LayoutMenu;
