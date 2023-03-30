import React from "react";
import { Breadcrumb } from "antd";
import { useRecoilValue } from "recoil";
import { useLocation } from "react-router-dom";
import { breadcrumbNameMap } from "@/store/store";
const BreadcrumbNav = () => {
  const { pathname } = useLocation();
  const breadcrumbState: any = useRecoilValue(breadcrumbNameMap);
  const breadcrumbList =
    breadcrumbState[pathname]?.map((item: string) => {
      return {
        title: item,
      };
    }) || [];
  return (
    <Breadcrumb items={breadcrumbList} />
    // >=5.3.0 可用，推荐的写法 ✅
    //  return <Breadcrumb items={[{ title: 'sample' }]} />;
  );
};

export default BreadcrumbNav;
