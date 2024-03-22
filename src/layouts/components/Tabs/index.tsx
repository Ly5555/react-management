/*
 * @Author: Lyq
 * @Date: 2023-07-06 20:26:58
 * @LastEditors: Lyq
 * @LastEditTime: 2024-03-22 21:32:54
 */
import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Dropdown, MenuProps } from "antd";
import {
  ReloadOutlined,
  CloseOutlined,
  RightOutlined,
  LeftOutlined,
  RollbackOutlined,
  RedoOutlined,
} from "@ant-design/icons";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { cloneDeep } from "lodash";
import { useTabLists } from "@/stores";
import { routerArray } from "@/routers/index";
import { searchRoute } from "@/utils/util";
import { DraggableTab } from "./components";

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
  const location = useLocation();
  const { pathname } = location;

  const { tabList } = useTabLists();
  const useNavigateTo = useNavigate();
  const [activeKey, setActiveKey] = useState<string>(pathname);
  const [openDropdownTabKey, setopenDropdownTabKey] = useState("");

  useEffect(() => {
    addTabs();
  }, [pathname]);

  const generateMenuItems = (tabList: any[], openDropdownTabKey: string) => {
    return [
      {
        label: MultiTabOperation.REFRESH,
        icon: <ReloadOutlined style={{ fontSize: "16px" }} />,
        key: MultiTabOperation.REFRESH,
      },
      {
        label: MultiTabOperation.CLOSE,
        icon: <CloseOutlined style={{ fontSize: "16px" }} />,
        key: MultiTabOperation.CLOSE,
        disabled: tabList.length === 1,
      },
      {
        label: MultiTabOperation.CLOSELEFT,
        icon: <LeftOutlined style={{ fontSize: "16px" }} />,
        key: MultiTabOperation.CLOSELEFT,
        disabled:
          tabList.length <= 1 ||
          tabList.findIndex((item) => item.path === openDropdownTabKey) === 0,
      },
      {
        label: MultiTabOperation.CLOSERIGHT,
        icon: <RightOutlined style={{ fontSize: "16px" }} />,
        key: MultiTabOperation.CLOSERIGHT,
        disabled:
          tabList.findIndex((item) => item.path === openDropdownTabKey) === tabList.length - 1,
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
    ];
  };
  const items: MenuProps["items"] = useMemo(
    () => generateMenuItems(tabList, openDropdownTabKey),
    [tabList, openDropdownTabKey],
  );
  const renderTabTitle = useCallback(
    (item: { title: string; search: string }) => {
      const searchTitle = new URLSearchParams(item.search);
      const title = searchTitle.get("title");
      return (
        <Dropdown
          menu={{ items, onClick: (e) => handelmenuClick(e, item) }}
          onOpenChange={(open: any, info) => onOpenChange(open, info, item)}
          trigger={["contextMenu"]}>
          <div>{title ? title : item.title}</div>
        </Dropdown>
      );
    },
    [items, tabList, openDropdownTabKey],
  );

  const newTabsList = useMemo(() => {
    return tabList
      .map((item: any, index) => {
        return {
          key: item.path,
          label: renderTabTitle(item),
          closable: tabList.filter((obj) => Object.keys(obj).length !== 0).length > 1,
        };
      })
      .filter((item) => item.key);
  }, [tabList, openDropdownTabKey]);

  const onOpenChange = (open: any, info: any, item: any) => {
    setopenDropdownTabKey(open ? item.path : "");
  };
  const handelClickTabs = (path: string) => {
    useNavigateTo(path);
  };
  // 添加 tabs
  const addTabs = () => {
    const route = searchRoute(pathname, routerArray);
    const newTabsList = cloneDeep(tabList);
    if (!route || !route.path) return;
    let path = location.pathname + location.search;

    if (tabList.every((item: any) => item.path !== path)) {
      newTabsList.push({
        ...route,
        title: route?.meta!?.title,
        path: path,
        search: location.search,
      });
    }
    setActiveKey(path);
    useTabLists.setState({ tabList: newTabsList });
  };

  // 删除单个tabs
  const clonseTabs = (tabPath: React.MouseEvent | React.KeyboardEvent | string) => {
    let path = pathname + location.search;
    if (path === tabPath) {
      tabList.forEach((item, index) => {
        if (item.path !== path) return;
        const nextTab = tabList[index + 1] || tabList[index - 1];
        if (!nextTab) return;
        setActiveKey(nextTab.path);
        useNavigateTo(nextTab.path);
      });
    }
    let newList = tabList.filter((item: { path: string }) => item.path !== tabPath).filter(Boolean);
    useTabLists.setState({ tabList: newList });
  };

  // 关闭其他
  const closeOtherTabs = (tabPath: string) => {
    const newTabs = tabList.filter((item) => item.path === tabPath);
    useTabLists.setState({ tabList: newTabs });
    setActiveKey(tabPath);
  };

  // 关闭所有
  const closeAllTabs = () => {
    useTabLists.setState({ tabList: [] });
    useNavigateTo(HOME_URL);
  };

  // 关闭左侧
  const closeLeftTabs = (tabPath: string) => {
    const currentTabIndex = tabList.findIndex((item) => item.path === tabPath);
    const newTabs = tabList.slice(currentTabIndex);
    useTabLists.setState({ tabList: newTabs });
    setActiveKey(tabPath);
  };

  // 关闭右侧
  const closeRightTabs = (tabPath: string) => {
    const currentTabIndex = tabList.findIndex((item) => item.path === tabPath);
    const newTabs = tabList.slice(0, currentTabIndex + 1);
    useTabLists.setState({ tabList: newTabs });
    setActiveKey(tabPath);
  };

  //删除点击
  const handelmenuClick = useCallback(
    (e: any, item: any) => {
      const { key, domEvent } = e || {};
      domEvent.stopPropagation();
      switch (key) {
        case MultiTabOperation.REFRESH:
          return;
        case MultiTabOperation.CLOSE:
          return clonseTabs(item.path);
        case MultiTabOperation.CLOSEOTHERS:
          return closeOtherTabs(item.path);
        case MultiTabOperation.CLOSELEFT:
          return closeLeftTabs(item.path);
        case MultiTabOperation.CLOSERIGHT:
          return closeRightTabs(item.path);
        case MultiTabOperation.CLOSEALL:
          return closeAllTabs();
        default:
          break;
      }
    },
    [clonseTabs, closeOtherTabs, closeLeftTabs, closeRightTabs, closeAllTabs],
  );
  return (
    <div className={styles.tabs_box}>
      <DraggableTab
        hideAdd
        animated
        size="small"
        onChange={handelClickTabs}
        tabBarGutter={4}
        activeKey={activeKey}
        type="editable-card"
        onEdit={clonseTabs}
        items={newTabsList}
      />
    </div>
  );
};

export default LayoutTabs;
