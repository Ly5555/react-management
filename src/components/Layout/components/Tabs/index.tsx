/*
 * @Author: liuyongqing
 * @Date: 2023-07-06 20:26:58
 * @LastEditors: liuyongqing
 * @LastEditTime: 2023-11-15 21:54:59
 */
import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Dropdown, MenuProps, Tabs, TabsProps } from "antd";
import {
  CloseCircleFilled,
  ReloadOutlined,
  CloseOutlined,
  RightOutlined,
  LeftOutlined,
  RollbackOutlined,
  RedoOutlined,
} from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
import { useTabLists } from "@/store";
import { routerArray } from "@/routers/index";
import { searchRoute } from "@/utils/util";
import { HOME_URL } from "@/config/config";
import styles from "./index.module.less";

enum MultiTabOperation {
  REFRESH = "刷新",
  CLOSE = "关闭",
  CLOSEOTHERS = "关闭其他",
  CLOSEALL = "关闭所有",
  CLOSELEFT = "关闭左侧",
  CLOSERIGHT = "关闭右测",
}
const LayoutTabs = () => {
  const { pathname } = useLocation();
  const useNavigateTo = useNavigate();
  const [activeKey, setActiveKey] = useState<string>(pathname);
  const { tabList } = useTabLists();

  useEffect(() => {
    addTabs();
  }, [pathname]);
  // dropdown下拉选
  const items: MenuProps["items"] = useMemo(
    () => [
      {
        label: MultiTabOperation.REFRESH,
        icon: <ReloadOutlined style={{ fontSize: "16px" }} />,
        key: MultiTabOperation.REFRESH,
      },
      {
        label: MultiTabOperation.CLOSE,
        icon: <CloseOutlined style={{ fontSize: "16px" }} />,
        key: MultiTabOperation.CLOSE,
      },
      {
        label: MultiTabOperation.CLOSELEFT,
        icon: <LeftOutlined style={{ fontSize: "16px" }} />,
        key: MultiTabOperation.CLOSELEFT,
      },
      {
        label: MultiTabOperation.CLOSERIGHT,
        icon: <RightOutlined style={{ fontSize: "16px" }} />,
        key: MultiTabOperation.CLOSERIGHT,
      },
      {
        label: MultiTabOperation.CLOSEOTHERS,
        icon: <RollbackOutlined style={{ fontSize: "16px" }} />,
        key: MultiTabOperation.CLOSEOTHERS,
        disabled: tabList.length === 1,
      },
      {
        label: MultiTabOperation.CLOSEALL,
        icon: <RedoOutlined style={{ fontSize: "16px" }} />,
        key: MultiTabOperation.CLOSEALL,
        disabled: tabList.length === 1,
      },
    ],
    [tabList],
  );
  const renderTabTitle = useCallback(
    (item: { title: string }) => {
      return (
        <Dropdown menu={{ items, onClick: (e) => handelmenuClick(e, item) }} trigger={["contextMenu"]}>
          <div>{item.title}</div>
        </Dropdown>
      );
    },
    [items],
  );
  const newTabsList = useMemo(() => {
    return tabList
      .map((item: any, index) => {
        return {
          key: item?.path,
          label: renderTabTitle(item),
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
      newTabsList.push({ ...route, title: route?.meta!?.title, path: route.path });
    }
    useTabLists.setState({ tabList: newTabsList });
    setActiveKey(pathname);
  };
  // 删除单个tabs
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
    useTabLists.setState({ tabList: newList });
  };
  // 关闭其他
  const closeOtherTabs = (tabPath: string) => {
    let newList = tabList.filter((item) => item.path === tabPath);
    useTabLists.setState({ tabList: newList });
  };
  // 关闭所有
  const closeAllTabs = () => {
    useTabLists.setState({ tabList: [] });
    useNavigateTo(HOME_URL);
  };
  //删除点击
  const handelmenuClick = (e: any, item: any) => {
    console.log(item, "128");
    const { key, domEvent } = e || {};
    domEvent.stopPropagation();
    switch (key) {
      case MultiTabOperation.REFRESH:
        return;
      case MultiTabOperation.CLOSE:
        return deleteTabs(item.path);
      case MultiTabOperation.CLOSEOTHERS:
        return closeOtherTabs(item.path);
      case MultiTabOperation.CLOSEALL:
        return closeAllTabs();
    }
  };
  // 渲染TabBar
  const renderTabBar: TabsProps["renderTabBar"] = (props, DefaultTabBar) => {
    return <DefaultTabBar {...props}></DefaultTabBar>;
  };

  return (
    <div className={styles.tabs_box}>
      <Tabs
        hideAdd
        animated
        onChange={handelClickTabs}
        tabBarGutter={4}
        activeKey={activeKey}
        type="editable-card"
        onEdit={deleteTabs}
        items={newTabsList}
        renderTabBar={renderTabBar}
      />
    </div>
  );
};

export default LayoutTabs;
