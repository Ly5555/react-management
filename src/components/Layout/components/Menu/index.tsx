/*
 * @Author: liuyongqing
 * @Date: 2023-07-24 21:31:32
 * @LastEditors: liuyongqing
 * @LastEditTime: 2023-10-24 21:25:58
 */
import React, { useState, useEffect } from "react";
import { Menu } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import request from "@/utils/request/request";
import { searchRoute, getOpenKeys, findAllBreadcrumb } from "@/utils/util";
import { useIsExpand, useBreadcrumb } from "@/store";
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
  const { IsExpand } = useIsExpand();

  useEffect(() => {
    setSelectedKeys([pathname]);
    IsExpand ? null : setOpenKeys(getOpenKeys(pathname));
  }, [pathname]);
  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const { data } = await request({
          url: "https://www.fastmock.site/mock/302854084413bb6592dc4c53c7f85991/admin/menu/list",
          loading: true,
        });
        setmenuList(deepLoopMenu(data));
        useBreadcrumb.setState({ breadcrumbList: findAllBreadcrumb(data) as any });
      } catch (error) {
        console.log(error, "1");
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
      icon: icon || null,
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
