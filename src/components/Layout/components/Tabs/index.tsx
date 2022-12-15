import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { searchRoute } from "@/utils/util";
import { Tabs } from "antd";
import styles from "./css/indexTab.module.less"
import Home from "@/pages/home";
import { menuLists } from "@/store/store";
console.log(menuLists);

const LayoutTabs = (props: any) => {
  const { pathname } = useLocation();
  const useNavigateTo = useNavigate();
  const tabsList = useRecoilValue(menuLists)
  const [activeKey, setActiveKey] = useState<string>(pathname);
  useEffect(() => {
    addTabs();
  }, [pathname]);
  const handelClickTabs = (path: string) => {
    useNavigateTo(path);
  };
  // 添加 tabs
  const addTabs = () => {
    const route = searchRoute(pathname, tabsList);
    let newTabsList = JSON.parse(JSON.stringify(tabsList));
		if (tabsList.every((item: any) => item.path !== route.path)) {
			newTabsList.push({ title: 123, path: route.path });
		}
		// dispatch(setTabsList(newTabsList));
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
        items={tabsList}
      ></Tabs>
    </div>
  );
};

export default LayoutTabs;
