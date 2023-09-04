/*
 * @Author: liuyongqing
 * @Date: 2023-07-06 20:26:58
 * @LastEditors: liuyongqing
 * @LastEditTime: 2023-09-04 20:26:21
 */
import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Tabs } from "antd";
import { CloseCircleFilled, DeleteFilled } from "@ant-design/icons";
import { useLocation, useNavigate, Outlet } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { tabLists, isManyTabs } from "@/store/store";
import { routerArray } from "@/routers/index";
import { searchRoute } from "@/utils/util";
import styles from "./index.module.less";

const LayoutTabs = () => {
  const { pathname } = useLocation();
  const useNavigateTo = useNavigate();
  const [tabsList, setTabsList] = useRecoilState(tabLists || []);
  const [activeKey, setActiveKey] = useState<string>(pathname);
  const IsTabs = useRecoilValue(isManyTabs);
  useEffect(() => {
    addTabs();
  }, [pathname]);
  const newTabsList = useMemo(() => {
    return tabsList
      .map((item: any, index) => {
        return {
          key: item?.path,
          label: item?.title,
          closeIcon: <CloseCircleFilled />,
          closable: tabsList.filter((obj) => Object.keys(obj).length !== 0).length > 1,
        };
      })
      .filter((item) => item.key);
  }, [tabsList]);

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
    <div className={styles.tabs_box}>
      <Tabs
        hideAdd
        animated
        onChange={handelClickTabs}
        activeKey={activeKey}
        type="editable-card"
        onEdit={deleteTabs}
        items={newTabsList}
      />
    </div>
  );
};

export default LayoutTabs;
