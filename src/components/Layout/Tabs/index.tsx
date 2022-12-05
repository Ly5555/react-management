import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { routerArray } from "@/router/index";
import { searchRoute } from "@/utils/util";
import { Tabs } from "antd";
const LayoutTabs = (props:any) => {
  const { TabPane } = Tabs;
  const { pathname } = useLocation();
  const useNavigateTo = useNavigate();
  
  // const { tabsList } = props?.tabs;
  // console.log(tabsList);
  
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
    setActiveKey(pathname)
  };
  // 删除tabs
  const onEdit = () => {};
  return (
    <div>
      <Tabs hideAdd onChange={handelClickTabs} activeKey={activeKey} type="editable-card" onEdit={onEdit}></Tabs>
    </div>
  );
};

export default LayoutTabs;
