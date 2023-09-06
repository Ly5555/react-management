/*
 * @Author: liuyongqing
 * @Date: 2023-07-06 20:26:58
 * @LastEditors: liuyongqing
 * @LastEditTime: 2023-09-06 17:01:46
 */
import React, { useState, useEffect, useMemo } from "react";
import { Tabs } from "antd";
import { CloseCircleFilled } from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
import { useTabLists } from "@/store";
import { routerArray } from "@/routers/index";
import { searchRoute } from "@/utils/util";
import styles from "./index.module.less";

const LayoutTabs = () => {
  const { pathname } = useLocation();
  const useNavigateTo = useNavigate();
  const [activeKey, setActiveKey] = useState<string>(pathname);
  const { tabList } = useTabLists();

  useEffect(() => {
    addTabs();
  }, [pathname]);
  const newTabsList = useMemo(() => {
    return tabList
      .map((item: { path: string; title: string }, index) => {
        return {
          key: item?.path,
          label: item?.title,
          closeIcon: <CloseCircleFilled />,
          closable: tabList.filter((obj) => Object.keys(obj).length !== 0).length > 1,
        };                                                                    
      })
      .filter((item) => item.key);
  }, [tabList]);

  const handelClickTabs = (path: string) => {
    useNavigateTo(path);
  };

  // 添加 tabs
  const addTabs = () => {
    const route = searchRoute(pathname, routerArray);
    let newTabsList = JSON.parse(JSON.stringify(tabList));
    if (tabList.every((item: any) => item.path !== route.path)) {
      newTabsList.push({ title: route?.meta!?.title, path: route.path });
    }
    useTabLists.setState({ tabList: newTabsList });
    setActiveKey(pathname);
  };
  // 删除tabs
  const deleteTabs = (tabPath: React.MouseEvent | React.KeyboardEvent | string) => {
    if (pathname === tabPath) {
      tabList.forEach((item, index) => {
        if (item.path !== pathname) return;
        const nextTab = tabList[index + 1] || tabList[index - 1];
        if (!nextTab) return;
        useNavigateTo(nextTab.path);
      });
    }
    let newList = tabList.filter((item: { path: string }) => item.path !== tabPath);
    console.log(newList);

    useTabLists.setState({ tabList: newList });
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
