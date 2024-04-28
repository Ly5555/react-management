/*
 * @Author: Lyq
 * @Date: 2023-04-19 21:17:42
 * @LastEditors: Lyq 
 * @LastEditTime: 2024-04-28 22:38:33
 */
import React, { useEffect, useState } from "react";
import { Breadcrumb } from "antd";
import { useLocation, Link } from "react-router-dom";
import { useBreadcrumb, useMenuList } from "@/stores";
import Icon from "@ant-design/icons/lib/components/Icon";

const BreadcrumbNav = () => {
  const { pathname } = useLocation();
  const { breadcrumbList } = useBreadcrumb();
  const { menuList } = useMenuList();
  const [curBreadcrumb, setCurBreadcrumb] = useState([]);
  const renderTitle = (item: any, isLink: boolean) => {
    const { icon, title } = item.meta || {};
    const content = (
      <>
        <span>{<Icon name={icon!} />}</span>
        <span>{title}</span>
      </>
    );
    return isLink ? <Link to={item.path}>{content}</Link> : content;
  };
  const breadcrumb = pathname.split("/").filter((i) => i);
  console.log(breadcrumb, "breadcrumb");
  const transformMenuData = (originalData: any) => {
    const transformedObject: any = {};
    originalData.forEach((item: any) => {
      const { title, path, children } = item;
      if (!children) {
        transformedObject[path] = [{ title }];
        return;
      }
      children.forEach((child: any) => {
        const { path: childPath, title: childTitle, children: grandchildren } = child;
        const siblingTitles = children.filter((t: any) => t.title !== childTitle) || [];
        transformedObject[childPath] = [
          { title },
          {
            title: childTitle,
            menu: {
              items: [
                { label: <Link to={childPath}>{childTitle}</Link> },
                ...siblingTitles.map((t: any) => ({
                  label: <Link to={t[0]?.children?.path}>{t.title}</Link>,
                })),
              ],
            },
          },
        ];
        if (grandchildren) {
          grandchildren.forEach((grandchild: any) => {
            const { path: grandchildPath, title: grandchildTitle } = grandchild;
            const grandchildSiblingTitles: any[] =
              grandchildren.filter((gc: any) => gc.title !== grandchildTitle) || [];

            transformedObject[grandchildPath] = [
              { title },
              {
                title: childTitle,
              },
              {
                title: grandchildTitle,
                menu: {
                  items: [
                    { label: <Link to={grandchildPath}>{grandchildTitle}</Link> },
                    ...grandchildSiblingTitles.map((gc: any) => ({
                      label: <Link to={gc.path}>{gc.title}</Link>,
                    })),
                  ],
                },
              },
            ];
          });
        }
      });
    });

    return transformedObject;
  };


  const transformedMenu = transformMenuData(menuList);
  console.log(transformedMenu, "transformedMenu");
  return (
    <div id="driver_breadcrumb">
      <Breadcrumb items={transformedMenu[pathname]} />
    </div>
  );
};

export default BreadcrumbNav;
