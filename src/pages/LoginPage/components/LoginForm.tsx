/*
 * @Author: liuyongqing
 * @Date: 2023-07-25 21:03:23
 * @LastEditors: liuyongqing
 * @LastEditTime: 2023-09-19 11:36:11
 */
import React, { useState } from "react";
import md5 from "js-md5";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Space, message } from "antd";
import { useNavigate } from "react-router-dom";
// import { tokenAtom } from "@/store/store";
import { useTabLists } from "@/store";
import request from "@/utils/request/request";
import { HOME_URL } from "@/config/config";
const LoginForm = () => {
  const navigaiteTo = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [form] = Form.useForm();
  // 提交
  const handleOnFinish = async () => {
    try {
      setLoading(true);
      const values = await form.validateFields();
      console.log(values);
      const { data } = await request({
        url: "https://www.fastmock.site/mock/302854084413bb6592dc4c53c7f85991/admin/login",
        method: "post",
        data: { ...values, password: md5(values.password) },
      });
      // setTokenAtom(data?.access_token);
      useTabLists.setState({ tabList: [] });
      navigaiteTo(HOME_URL);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <Form form={form} style={{ maxWidth: 500 }} initialValues={{ remember: true }}>
        <Form.Item name="username" rules={[{ required: true, message: "请输入你的账号" }]}>
          <Input allowClear prefix={<UserOutlined />} placeholder="admin or user" />
        </Form.Item>
        <Form.Item name="password" rules={[{ required: true, message: "请输入密码" }]}>
          <Input.Password prefix={<LockOutlined />} type="password" placeholder="Your password" />
        </Form.Item>
        <Form.Item>
          <Space>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>记住密码</Checkbox>
            </Form.Item>
            <a>忘记密码?</a>
          </Space>
        </Form.Item>
        <Form.Item
          name="agreement"
          valuePropName="checked"
          rules={[
            {
              validator: (_, value) =>
                value ? Promise.resolve() : Promise.reject(new Error("请先阅读并同意用户协议")),
            },
          ]}>
          <Checkbox>
            已阅读并同意 <a>《用户协议》</a>
          </Checkbox>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            loading={loading}
            htmlType="submit"
            className="login-form-button"
            onClick={handleOnFinish}>
            登 录
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default LoginForm;
