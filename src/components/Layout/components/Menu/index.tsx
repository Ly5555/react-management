import React, { useState, useEffect } from "react";
import { Menu, Spin } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import request from "@/utils/request/request";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { searchRoute, getOpenKeys, findAllBreadcrumb } from "@/utils/util";
import { IsExpand, breadcrumbNameMap } from "@/store/store";
import type { MenuProps } from "antd";
import * as Icons from "@ant-design/icons";
import { LayoutLogo } from "../index";
import styles from "./css/menu.module.less";
type MenuItem = Required<MenuProps>["items"][number];

const LayoutMenu = () => {
  const navigaiteTo = useNavigate();
  const { pathname } = useLocation();
  // const [loading, setLoading] = useState(false);
  const [menuList, setmenuList] = useState<MenuItem[]>([]);
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([pathname]);
  const isCollapse = useRecoilValue(IsExpand);
  const setBreadcrumbList = useSetRecoilState(breadcrumbNameMap);
  useEffect(() => {
    setSelectedKeys([pathname]);
    isCollapse ? null : setOpenKeys(getOpenKeys(pathname));
  }, [pathname]);
  useEffect(() => {
    try {
      const menu = async () => {
        const { data } = await request({
          url: "https://www.fastmock.site/mock/302854084413bb6592dc4c53c7f85991/admin/menu/list",
          loading: true
        });
        setmenuList(deepLoopMenu(data));
        setBreadcrumbList(findAllBreadcrumb(data) as any);
      };
      menu();
    } catch (error) { }
  }, []);
  // 动态Icon处理
  const customIcons: { [key: string]: any } = Icons;
  const addIcon = (name: string) => {
    return React.createElement(customIcons[name]);
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
      if (!item?.children) return newArr.push(getItem(item.title, item.path));
      newArr.push(getItem(item.title, item.path, addIcon(item.icon!), deepLoopMenu(item.children)));
    });
    return newArr;
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
