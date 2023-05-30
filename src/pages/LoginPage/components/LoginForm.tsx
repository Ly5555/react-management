//登陆页
import React, {useState} from "react";
import {LockOutlined, UserOutlined} from "@ant-design/icons";
import {Avatar, Button, Checkbox, Form, Input, Space} from "antd";
import {useNavigate} from "react-router-dom";
const LoginForm = () => {
  const navigaiteTo = useNavigate();
  const [form] = Form.useForm();
  // 提交
  const handleOnFinish = async () => {
    try {
      const values = await form.validateFields();
      navigaiteTo("/home/home");
    } catch (error) {
      console.log(error);
    }
  };

  const tailLayout = {
    wrapperCol: {
      offset: 2,
      span: 16,
    },
  };
  return (
    <>
      <Form form={form} style={{maxWidth: 500}} initialValues={{remember: true}}>
        <Form.Item name="username" rules={[{required: true, message: "请输入你的账号"}]}>
          <Input allowClear prefix={<UserOutlined />} placeholder="admin or user" />
        </Form.Item>
        <Form.Item name="password" rules={[{required: true, message: "请输入密码"}]}>
          <Input.Password prefix={<LockOutlined />} type="password" placeholder="Your password" />
        </Form.Item>
        <Form.Item >
        <Space>
          <Form.Item name='remember' valuePropName='checked' noStyle>
            <Checkbox>记住密码</Checkbox>
          </Form.Item>
          <a>
            忘记密码?
          </a>
        </Space>
      </Form.Item>
        <Form.Item
          name="agreement"
          valuePropName="checked"
        >
          <Checkbox>
            已阅读并同意 <a>《用户协议》</a>
          </Checkbox>
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button type="primary" onClick={handleOnFinish} style={{marginRight: 8}}>
            登录
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default LoginForm;
