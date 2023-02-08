import React, { useState, useEffect, } from "react";
import { Menu, Spin } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { useSetRecoilState } from "recoil";
import { searchRoute,  } from "@/utils/util";
import { menuLists } from "@/store/store";
import type { MenuProps } from "antd";
import * as Icons from "@ant-design/icons";
import { LayoutLogo } from "../index";
type MenuItem = Required<MenuProps>["items"][number];
const LayoutMenu = () => {
  const navigaiteTo = useNavigate();
  const { pathname } = useLocation();
  const [loading, setLoading] = useState(false);
  const [menuList, setmenuList] = useState<MenuItem[]>([]);
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([pathname]);
  const setMenlists = useSetRecoilState(menuLists);
  useEffect(() => {
    setSelectedKeys([pathname]);
  }, [pathname]);
  useEffect(() => {
    setLoading(true);
    try {
      axios
        .get("https://www.fastmock.site/mock/302854084413bb6592dc4c53c7f85991/admin/menu/list")
        .then((res) => {
          setLoading(false);
          const { data } = res.data;
          setmenuList(deepLoopMenu(data));
          setMenlists(data);
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
  const handelChangeClick: MenuProps["onClick"] = ({ key }: { key: string }) => {
    const route = searchRoute(key, menuList as any);
    if (route.isLink) window.open(route.isLink, "_blank");
    navigaiteTo(key);
  };
  // 处理路由
  const deepLoopMenu = (menuList: Menu.MenuOptions[], newArr: MenuItem[] = []) => {
    menuList?.forEach((item) => {
      if (!item?.children?.length) return newArr.push(getItem(item.title, item.path, addIcon(item.icon!)));
      newArr.push(getItem(item.title, item.path, addIcon(item.icon!), deepLoopMenu(item.children)));
    });
    return newArr;
  };
  // 设置当前展开的 subMenu
  const onOpenChange = (openKeys: string[]) => {
    if (openKeys.length === 0 || openKeys.length === 1) return setOpenKeys(openKeys);
    const latestOpenKey = openKeys[openKeys.length - 1];
    if (latestOpenKey.includes(openKeys[0])) return setOpenKeys(openKeys);
    setOpenKeys([latestOpenKey]);
  };
  return (
    <div>
      <Spin spinning={loading} tip="loading....">
        <LayoutLogo />
        <Menu
          theme="dark"
          mode="inline"
          triggerSubMenuAction="click"
          items={menuList}
          openKeys={openKeys}
          onOpenChange={onOpenChange}
          selectedKeys={selectedKeys}
          onClick={handelChangeClick}
        />
      </Spin>
    </div>
  );
};

export default LayoutMenu;
