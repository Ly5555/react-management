/*
 * @Author: liuyongqing
 * @Date: 2023-11-21 21:32:19
 * @LastEditors: liuyongqing
 * @LastEditTime: 2023-11-21 21:46:52
 */
import React from "react";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { Modal } from "antd";
import { useNavigate } from "react-router-dom";
import { useToken } from "@/store";
const LogOutModal = () => {
  const { confirm } = Modal;
  const useNavigateTo = useNavigate();
  const showDeleteConfirm = () => {
    confirm({
      title: "温馨提示?",
      icon: <ExclamationCircleFilled />,
      content: "是否确认退出登录？",
      okText: "确定",
      okType: "danger",
      cancelText: "取消",
      onOk() {
        useNavigateTo("/login");
        useToken.setState({ token: "" });
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  return (
    <>
      <span onClick={showDeleteConfirm}>退出登录</span>
    </>
  );
};

export default LogOutModal;
