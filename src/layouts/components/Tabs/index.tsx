/*
 * @Author: liuyongqing
 * @Date: 2023-07-06 20:26:58
 * @LastEditors: Lyq
 * @LastEditTime: 2024-03-11 21:05:17
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
import { useLocation, useNavigate } from "react-router-dom";
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
  const { pathname } = useLocation();
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
    (item: { title: string }) => {
      return (
        <Dropdown
          menu={{ items, onClick: (e) => handelmenuClick(e, item) }}
          onOpenChange={(open: any, info) => onOpenChange(open, info, item)}
          trigger={["contextMenu"]}>
          <div>{item.title}</div>
        </Dropdown>
      );
    },
    [items, tabList, openDropdownTabKey],
  );

  const newTabsList = useMemo(() => {
    return tabList
      .map((item: any, index) => {
        return {
          key: item?.path,
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
    let newTabsList = JSON.parse(JSON.stringify(tabList));
    // 检查 route 和 route.path 是否有效
    if (!route || !route.path) return;
    if (tabList.every((item: any) => item.path !== route.path)) {
      newTabsList.push({ ...route, title: route?.meta!?.title, path: route.path });
    }
    useTabLists.setState({ tabList: newTabsList });
    setActiveKey(pathname);
  };

  // 删除单个tabs
  const clonseTabs = (tabPath: React.MouseEvent | React.KeyboardEvent | string) => {
    if (pathname === tabPath) {
      tabList.forEach((item, index) => {
        if (item.path !== pathname) return;
        const nextTab = tabList[index + 1] || tabList[index - 1];
        if (!nextTab) return;
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
