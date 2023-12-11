/*
 * @Author: liuyongqing
 * @Date: 2023-11-16 22:28:43
 * @LastEditors: liuyongqing
 * @LastEditTime: 2023-12-07 21:14:34
 */
import React from "react";
import { Avatar, Dropdown, Space } from "antd";
import type { MenuProps } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { LogOutModal } from "./index";
const AvatarIcon = () => {
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
          test测试
        </a>
      ),
    },
    {
      key: "2",
      label: <span className="dropdown-item">个人信息</span>,
    },
    {
      key: "3",
      label: <span className="dropdown-item">修改密码</span>,
    },
    {
      key: "4",
      icon: <UserOutlined />,
      label: <LogOutModal />,
    },
  ];
  return (
    <div id="driver_avatar">
      <Dropdown menu={{ items }} arrow={{ pointAtCenter: true }}>
        <Space>
          <Avatar icon={<UserOutlined />}></Avatar>
          <a onClick={(e) => e.preventDefault()}>Hooks</a>
        </Space>
      </Dropdown>
    </div>
  );
};

export default AvatarIcon;
