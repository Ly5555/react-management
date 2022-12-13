import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { searchRoute } from "@/utils/util";
import { Tabs } from "antd";
import styles from "./css/indexTab.module.less"
import Home from "@/pages/home";
const LayoutTabs = (props: any) => {
  const { pathname } = useLocation();
  const useNavigateTo = useNavigate();
  // const { tabsList } = props?.tabs;

  const [activeKey, setActiveKey] = useState<string>(pathname);
  useEffect(() => {
    addTabs();
  }, [pathname]);
  const handelClickTabs = (path: string) => {
    useNavigateTo(path);
  };
  // 添加 tabs
  const addTabs = () => {
    // const route = searchRoute(pathname, routerArray);
    // let newTabsList = JSON.parse(JSON.stringify(tabsList));
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
        items={[
          {
            label: `首页`,
            key: "/home",
            children: <Home/>,
          },
          {
            label: `Tab 2`,
            key: "2",
            children: `Content of Tab Pane 2`,
          },
          {
            label: `Tab 3`,
            key: "3",
            children: `Content of Tab Pane 3`,
          },
        ]}
      ></Tabs>
    </div>
  );
};

export default LayoutTabs;
