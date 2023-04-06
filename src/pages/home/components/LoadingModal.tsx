import React, { useEffect, useState } from "react";
import { Button, Modal, Spin } from "antd";
import { Loading } from "./index";
const LoadingModal = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const showModal = () => {
    setOpen(true);
  };
  useEffect(() => {
    if (open) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 2000);
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
        <Loading loading={loading}>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Loading>
      </Modal>
    </>
  );
};

export default LoadingModal;
