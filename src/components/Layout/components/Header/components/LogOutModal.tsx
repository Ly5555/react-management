/*
 * @Author: liuyongqing
 * @Date: 2023-11-21 21:32:19
 * @LastEditors: liuyongqing
 * @LastEditTime: 2023-11-22 21:07:37
 */
import React, { useState } from "react";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { Modal } from "antd";
import { useNavigate } from "react-router-dom";
import { useGlobalStore } from "@/stores";
const LogOutModal = () => {
  const useNavigateTo = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    useNavigateTo("/login");
    useGlobalStore.setState({ token: "" });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <span onClick={showModal}>退出登录</span>
      <Modal
        title={
          <span>
            <ExclamationCircleFilled style={{ color: "#faad14", fontSize: 18, marginRight: 8 }} />
            温馨提示
          </span>
        }
        open={isModalOpen}
        onOk={handleOk}
        okType="danger"
        onCancel={handleCancel}>
        <div>是否确认退出登录？</div>
      </Modal>
    </>
  );
};

export default LogOutModal;
