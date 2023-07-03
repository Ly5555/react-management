import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { tabLists, tabListState } from "@/store/store";
import { routerArray } from "@/routers";
import { Tabs } from "antd";
import { searchRoute } from "@/utils/util";
import styles from "./css/indexTab.module.less";
const LayoutTabs = () => {
  const { pathname } = useLocation();
  const useNavigateTo = useNavigate();
  const [tabsList, setTabsList] = useRecoilState(tabLists);
  const tabListStateL = useRecoilValue(tabListState);
  const [activeKey, setActiveKey] = useState<string>(pathname);
  useEffect(() => {
    addTabs();
  }, [pathname]);

  const handelClickTabs = (path: string) => {
    useNavigateTo(path);
  };
  // 添加 tabs
  const addTabs = () => {
    const route = searchRoute(pathname, routerArray);
    let newTabsList = JSON.parse(JSON.stringify(tabsList));
    if (tabsList.every((item: any) => item.path !== route.path)) {
      newTabsList.push({ ...route, title: route.title, path: route.path });
    }
    setTabsList(newTabsList);
    setActiveKey(pathname);
  };
  // 删除tabs
  const deleteTabs = (tabPath: string) => {
    if (pathname === tabPath) {
      tabsList.forEach((item: Menu.MenuOptions, index: number) => {
        if (item.path !== pathname) return;
        const nextTab: Menu.MenuOptions = tabsList[index + 1] || tabsList[index - 1];
        if (!nextTab) return;
        useNavigateTo(nextTab.path);
      });
    }
    setTabsList(tabsList.filter((item: Menu.MenuOptions) => item.path !== tabPath))
  };
  return (
    <div className={styles.tabsName}>
      <Tabs
        hideAdd
        animated
        onChange={handelClickTabs}
        activeKey={activeKey}
        type="editable-card"
        onEdit={path => deleteTabs(path as string)}
        items={tabListStateL}
      />
    </div>
  );
};

export default LayoutTabs;
