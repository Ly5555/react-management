import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { searchRoute } from "@/utils/util";
import { Tabs } from "antd";
import styles from "./css/indexTab.module.less";
import { menuLists, charMenulist } from "@/store/store";
const LayoutTabs = (props: any) => {
  const { pathname } = useLocation();
  const useNavigateTo = useNavigate();
  const { TabPane } = Tabs;
  const [tabsList, setTabsList] = useRecoilState(menuLists);
  const [activeKey, setActiveKey] = useState<string>(pathname);
  useEffect(() => {
    addTabs();
  }, [pathname]);

  const handelClickTabs = (path: string) => {
    useNavigateTo(path);
  };

  // 添加 tabs
  const addTabs = () => {
    const route = searchRoute(pathname, []);
    let newTabsList = JSON.parse(JSON.stringify(tabsList));
    if (tabsList.every((item: any) => item.path !== route.path)) {
      newTabsList.push({ title: route.title, path: route.path });
    }
    setTabsList(newTabsList);
    setActiveKey(pathname);
  };

  // 删除tabs
  const onEdit = () => {};

  return (
    <div className={styles.tabsName}>
      <Tabs
        hideAdd
        onChange={handelClickTabs}
        activeKey={activeKey}
        type="editable-card"
        onEdit={onEdit}
        // items={tabsList}
      >
      </Tabs>
    </div>
  );
};

export default LayoutTabs;
