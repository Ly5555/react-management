/*
 * @Author: Lyq
 * @Date: 2023-12-04 20:06:47
 * @LastEditors: Lyq
 * @LastEditTime: 2024-01-04 21:46:06
 */
import React from "react";
import { Button } from "antd";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";

const TourModal = () => {
  const driverObj = driver({
    showProgress: true,
    nextBtnText: "下一步",
    prevBtnText: "上一步",
    doneBtnText: "关闭",
    steps: [
      { element: "#drive_layout", popover: { title: "Title", description: "这是菜单" } },
      { element: "#isCollapse", popover: { title: "菜单", description: "菜单展示缩小" } },
      { element: "#driver_breadcrumb", popover: { title: "面包屑", description: "这是面包屑" } },
      { element: "#driverjs_theme", popover: { title: "设置", description: "设置" } },
      { element: "#driver_avatar", popover: { title: "个人信息", description: "这是个人信息" } },
    ],
  });
  const handleTour = () => {
    driverObj.drive();
  };
  return (
    <div>
      <Button type="primary" onClick={handleTour}>
        123
      </Button>
    </div>
  );
};

export default TourModal;
