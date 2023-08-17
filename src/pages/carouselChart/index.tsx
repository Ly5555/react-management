/*
轮播图
*/
import { Button, Form, Input, Modal } from "antd";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import styles from "./carousel.module.less";
const CarouselChart = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  useEffect(() => {
    if (isModalOpen) {
      form.setFieldsValue({ note1: 122, note2: 122 });
    }
  }, [isModalOpen]);
  const handleOk = async () => {
    try {
      const values = await form.validateFields()
      console.log(values)
    } catch (error) {

    }

  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <div className={styles.carousel}>
      <Button type="primary" onClick={showModal}>
        Open Modal
      </Button>
      <Modal title="Basic Modal"
        destroyOnClose open={isModalOpen}
        onCancel={handleCancel} onOk={handleOk}>
        <Form
          form={form}
          name="control-hooks"
        >
          <Form.Item name="note1" label="Note1" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="note2" label="Note2" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
      <h2> Single Item </h2>
      <h2>官网:<Button type="link">https://react-slick.neostack.com/</Button></h2>
      <Slider {...settings}>
        <div>
          <h3>1</h3>
        </div>
        <div>
          <h3>2</h3>
        </div>
        <div>
          <h3>3</h3>
        </div>
        <div>
          <h3>4</h3>
        </div>
        <div>
          <h3>5</h3>
        </div>
        <div>
          <h3>6</h3>
        </div>
      </Slider>
    </div>
  );
};
export default CarouselChart;
