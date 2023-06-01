import React from "react";
import { Avatar, Dropdown, Space } from "antd";
import type { MenuProps } from "antd";
import { useNavigate } from "react-router-dom";
import { DownOutlined, UserOutlined } from "@ant-design/icons";
const AvatarIcon = () => {
  const useNavigateTo = useNavigate();
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
      label: <span className="dropdown-item" onClick={()=>useNavigateTo("/login")}>退出登录</span>,
    },
  ];
  return (
    <>
      <Dropdown menu={{ items }} arrow={{ pointAtCenter: true }}>
       
        <Space>
          <Avatar style={{ backgroundColor: "#87d068" }} icon={<UserOutlined />}></Avatar>
          <a onClick={(e) => e.preventDefault()}>
          	Hooks
          </a>
        </Space>
      </Dropdown>
    </>
  );
};

export default AvatarIcon;
