import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilState ,useRecoilValue} from "recoil";
import { tabLists,tabListState } from "@/store/store";
import { routerArray } from "@/router";
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
      newTabsList.push({...route, title: route.title, path: route.path });
    }
    console.log(newTabsList);
    setTabsList(newTabsList);
    setActiveKey(pathname);
  };
  // 删除tabs
  const onEdit = () => {};
  // 处理tabs成为antd
  // {
  //   key: '1',
  //   label: `Tab 1`,
  //   children: `Content of Tab Pane 1`,
  // },
  return (
    <div className={styles.tabsName}>
      <Tabs
        hideAdd
        animated
        onChange={handelClickTabs}
        activeKey={activeKey}
        type="editable-card"
        onEdit={onEdit}
        items={tabListStateL}
      />
    </div>
  );
};

export default LayoutTabs;
