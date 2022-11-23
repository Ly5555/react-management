import React from "react";
import { Menu } from "antd";
import { useNavigate, NavLink } from "react-router-dom";
import type { MenuProps } from "antd";

const LayoutMenu = (props: any) => {
  const navigaiteTo = useNavigate();
  type MenuItem = Required<MenuProps>["items"][number];
  function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: "group"
  ): MenuItem {
    return {
      key,
      icon,
      children,
      label,
      type,
    } as MenuItem;
  }
  const handelChangeClick = ({ key }: { key: string }) => {
    navigaiteTo(key);
  };
  const deepLoopMenu = ( menuList: Menu.MenuOptions[],newArr:MenuItem[] = []) => {
    menuList.forEach((item) => {
      if (!item?.children?.length) return newArr.push(getItem(item.title, item.path,));
      newArr.push(getItem(item.title, item.path,item.icon,deepLoopMenu(item.children)));
    });
    return newArr;
  };
  return (
    <div>
      <Menu
        theme="dark"
        mode="inline"
        items={deepLoopMenu(props.menu)}
        onClick={handelChangeClick}
      />
    </div>
  );
};

export default LayoutMenu;
