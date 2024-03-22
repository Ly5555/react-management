/*
 * @Author: liuyongqing
 * @Date: 2023-07-24 21:31:32
 * @LastEditors: Lyq
 * @LastEditTime: 2024-03-21 21:09:57
 */
import React, { useState, useEffect } from "react";
import { Menu } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import { lib } from "@/utils/request";
import { searchRoute, getOpenKeys, findAllBreadcrumb } from "@/utils/util";
import { useGlobalStore, useBreadcrumb } from "@/stores";
import type { MenuProps } from "antd";
import * as Icons from "@ant-design/icons";
import { LayoutLogo } from "../index";
import styles from "./index.module.less";
type MenuItem = Required<MenuProps>["items"][number];

const LayoutMenu = () => {
  const navigaiteTo = useNavigate();
  const { pathname } = useLocation();
  const [menuList, setmenuList] = useState<MenuItem[]>([]);
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([pathname]);
  const { collapsed } = useGlobalStore();

  useEffect(() => {
    setSelectedKeys([pathname]);
    collapsed ? null : setOpenKeys(getOpenKeys(pathname));
  }, [pathname, collapsed]);
  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const { data } = await lib.request({
          url: "https://mock.mengxuegu.com/mock/65d344a5351bbd02cf339ac3/menu/list",
          loading: true,
        });
        setmenuList(deepLoopMenu(data));
        useBreadcrumb.setState({ breadcrumbList: findAllBreadcrumb(data) as any });
      } catch (error) {
        console.log(error, "menuList error");
      }
    };
    fetchMenu();
  }, []);

  // 动态Icon处理
  const customIcons: { [key: string]: any } = Icons;
  const addIcon = (name: string) => {
    const CustomIcon = customIcons[name];
    return <CustomIcon />;
  };
  const getItem = (
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode | null,
    children?: MenuItem[],
    type?: "group",
  ): MenuItem => {
    return {
      key,
      icon: icon,
      children,
      label,
      type,
    } as MenuItem;
  };
  // 处理路由
  const deepLoopMenu = (menuList: Menu.MenuOptions[], newArr: MenuItem[] = []) => {
    menuList?.forEach((item) => {
      const icon = item.icon ? addIcon(item.icon) : null;
      if (!item?.children) return newArr.push(getItem(item.title, item.path, icon));
      newArr.push(getItem(item.title, item.path, icon, deepLoopMenu(item.children)));
    });
    return newArr;
  };
  const handelChangeClick: MenuProps["onClick"] = ({ key }: { key: string }) => {
    const route = searchRoute(key, menuList as any);
    if (route.isLink) window.open(route.isLink, "_blank");
    navigaiteTo(key);
  };
  // 设置当前展开的 subMenu
  const onOpenChange = (openKeys: string[]) => {
    if (openKeys?.length === 0 || openKeys.length === 1) return setOpenKeys(openKeys);
    const latestOpenKey = openKeys[openKeys.length - 1];

    if (latestOpenKey.includes(openKeys[0])) return setOpenKeys(openKeys);
    setOpenKeys([latestOpenKey]);
  };
  return (
    <div className={styles.menu}>
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
    </div>
  );
};

export default LayoutMenu;
