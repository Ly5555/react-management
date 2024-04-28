/*
 * @Author: Lyq
 * @Date: 2024-01-20 16:04:56
 * @LastEditors: Lyq
 * @LastEditTime: 2024-04-15 22:06:11
 */
import React, { useEffect, useState } from "react";
import { Button, Modal, Spin } from "antd";
const LoadingModal = () => {
  const [open, setOpen] = useState(false);
  // const [loading, setLoading] = useState<boolean>(false);
  const showModal = () => {
    setOpen(true);
  };
  useEffect(() => {
    if (open) {
      console.log("子组件会不会渲染执行");
    }
  }, [open]);
  const handleOk = () => {
    setOpen(false);
  };
  const handleCancel = () => {
    setOpen(false);
  };
  return (
    <>
      <Button type="primary" onClick={showModal}>
        Open Modal
      </Button>
      <Modal title="Basic Modal" open={open} onOk={handleOk} onCancel={handleCancel}>
        {/* <Loading loading={loading}> */}
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
        {/* </Loading> */}
      </Modal>
    </>
  );
};

export default LoadingModal;
