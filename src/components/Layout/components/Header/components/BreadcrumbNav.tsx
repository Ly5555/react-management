import React from "react";
import { Breadcrumb } from "antd";
import { useRecoilValue } from "recoil";
import { useLocation } from "react-router-dom";
import { breadcrumbNameMap } from "@/store/store";
const BreadcrumbNav = () => {
  const { pathname } = useLocation();
  const breadcrumbState: any = useRecoilValue(breadcrumbNameMap);
  const breadcrumbList = breadcrumbState[pathname] || [];
  return (
      <Breadcrumb>
        {breadcrumbList.map((item: string) => {
          return <Breadcrumb.Item key={item}>{item}</Breadcrumb.Item>;
        })}
      </Breadcrumb>
  );
};

export default BreadcrumbNav;
