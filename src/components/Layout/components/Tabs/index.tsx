/*
 * @Author: liuyongqing
 * @Date: 2023-07-06 20:26:58
 * @LastEditors: liuyongqing
 * @LastEditTime: 2023-08-17 21:45:07
 */
import React, { useState, useEffect } from "react";
import { Tabs } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { tabLists, isManyTabs } from "@/store/store";
import { routerArray } from "@/routers/index";
import { HOME_URL } from "@/config/config";
import { searchRoute } from "@/utils/util";

import styles from "./indexTab.module.less";

const LayoutTabs = () => {
  const { pathname } = useLocation();
  const useNavigateTo = useNavigate();
  const [tabsList, setTabsList] = useRecoilState(tabLists || []);
  const [activeKey, setActiveKey] = useState<string>(pathname);
  const IsTabs = useRecoilValue(isManyTabs);
  useEffect(() => {
    addTabs();
  }, [pathname]);
  const newTabsList = tabsList.map((item: any, index) => {
    return {
      key: item?.path,
      label: item?.title,
      ...(item.path === HOME_URL ? { closable: false } : {}),
    };
  });
  const handelClickTabs = (path: string) => {
    useNavigateTo(path);
  };

  // 添加 tabs
  const addTabs = () => {
    const route = searchRoute(pathname, routerArray);
    let newTabsList = JSON.parse(JSON.stringify(tabsList));
    if (tabsList.every((item: any) => item.path !== route.path)) {
      newTabsList.push({ title: route?.meta!?.title, path: route.path });
    }
    setTabsList(newTabsList);
    setActiveKey(pathname);
  };
  // 删除tabs
  const deleteTabs = (tabPath: React.MouseEvent | React.KeyboardEvent | string) => {
    if (pathname === tabPath) {
      tabsList.forEach((item: Menu.MenuOptions, index: number) => {
        if (item.path !== pathname) return;
        const nextTab: Menu.MenuOptions = tabsList[index + 1] || tabsList[index - 1];
        if (!nextTab) return;
        useNavigateTo(nextTab.path);
      });
    }
    setTabsList(tabsList.filter((item: any) => item.path !== tabPath));
  };
  return (
    <div className={styles.tabsName}>
      <Tabs
        hideAdd
        animated
        onChange={handelClickTabs}
        activeKey={activeKey}
        type="editable-card"
        onEdit={deleteTabs}
        items={IsTabs ? newTabsList : tabsList}
      />
    </div>
  );
};

export default LayoutTabs;
