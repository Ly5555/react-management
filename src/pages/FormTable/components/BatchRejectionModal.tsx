/*
 * @Author: liuyongqing
 * @Date: 2023-11-16 22:28:43
 * @LastEditors: liuyongqing
 * @LastEditTime: 2023-12-28 20:47:55
 */
import React, { useState } from "react";
import { Button, Modal, Input } from "antd";
const { TextArea } = Input;
interface IProps {
  data: {}[];
  selectArray: (value: []) => void;
}
const BatchRejectionModal = (props: IProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data, selectArray } = props || {};

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    selectArray([]);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    selectArray([]);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        批量驳回
      </Button>
      <Modal title="批量驳回" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <TextArea value={data.join("、")} placeholder="Controlled autosize" autoSize={{ minRows: 3, maxRows: 5 }} />
      </Modal>
    </>
  );
};

export default BatchRejectionModal;
