/*
 * @Author: Lyq
 * @Date: 2023-12-04 20:06:47
 * @LastEditors: Lyq 
 * @LastEditTime: 2024-07-10 21:05:53
 */
import React, { useEffect, useRef, useState } from "react";
import { Button, Tour } from "antd";
import type { GetRef, TourProps } from "antd";

const TourModal = () => {
  const refs = {
    driveLayout: useRef<HTMLElement | null>(null),
    isCollapse: useRef<HTMLElement | null>(null),
    driverBreadcrumb: useRef<HTMLElement | null>(null),
    driverJsTheme: useRef<HTMLElement | null>(null),
    driverAvatar: useRef<HTMLElement | null>(null)
  };

  useEffect(() => {
    refs.driveLayout.current = document.getElementById("drive_layout") as HTMLElement;
    refs.isCollapse.current = document.getElementById("isCollapse") as HTMLElement;
    refs.driverBreadcrumb.current = document.getElementById("driver_breadcrumb") as HTMLElement;
    refs.driverJsTheme.current = document.getElementById("driverjs_theme") as HTMLElement;
    refs.driverAvatar.current = document.getElementById("driver_avatar") as HTMLElement;
  }, []);
  const [open, setOpen] = useState<boolean>(false);
  const steps: TourProps["steps"] = [
    {
      title: "Title",
      description: "这是菜单",
      target: () => refs.driveLayout.current!,
    },
    {
      title: "菜单",
      description: "菜单展示缩小",
      target: () => refs.isCollapse.current!,
    },
    {
      title: "面包屑",
      description: "这是面包屑",
      target: () => refs.driverBreadcrumb.current!,
    },
    {
      title: "设置",
      description: "设置",
      target: () => refs.driverJsTheme.current!,
    },
    {
      title: "个人信息",
      description: "这是个人信息",
      target: () => refs.driverAvatar.current!,
    },
  ];
  return (
    <div>
      <Button type="primary" onClick={() => setOpen(true)}>
        Begin Tour
      </Button>
      <Tour open={open}   onClose={() => setOpen(false)} steps={steps} />
    </div>
  );
};

export default TourModal;
