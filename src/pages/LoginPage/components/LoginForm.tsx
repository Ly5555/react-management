/*
 * @Author: liuyongqing
 * @Date: 2023-07-25 21:03:23
 * @LastEditors: Lyq
 * @LastEditTime: 2024-03-04 20:17:54
 */
import React, { useEffect, useState } from "react";
import md5 from "js-md5";
import { LockOutlined, SafetyCertificateOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Space, Tabs, message } from "antd";
import { useNavigate } from "react-router-dom";
import { useTabLists, useGlobalStore } from "@/stores";
import request from "@/utils/request";
import { HOME_URL } from "@/config/config";
const { Search } = Input;

const LoginForm = () => {
  const navigaiteTo = useNavigate();

  const [loading, setLoading] = useState<boolean>(false);
  const [loginType, setLoginType] = useState("account");
  const [form] = Form.useForm();
  const codeUrl = "/api/user/code";
  useEffect(() => {
    const res = request({
      url: codeUrl,
      method: "get",
    });
    console.log(res);
  }, [loginType]);
  // 提交
  const handleOnFinish = async () => {
    try {
      // setLoading(true);
      const values = await form.validateFields();
      console.log(values);
      const res = await request({
        url: "/api/user/create",
        method: "post",
        data: values,
      });
      // useGlobalStore.setState({ token: data.access_token });
      // useTabLists.setState({ tabList: [] });
      navigaiteTo(HOME_URL);
    } catch (error) {
      console.log(error);
    } finally {
      // setLoading(false);
    }
  };
  return (
    <>
      <Form form={form} style={{ maxWidth: 500 }} initialValues={{ remember: true }}>
        <Tabs centered activeKey={loginType} onChange={(activeKey) => setLoginType(activeKey)}>
          <Tabs.TabPane key={"account"} tab={"账号密码登录"} />
          <Tabs.TabPane key={"phone"} tab={"手机号登录"} />
        </Tabs>
        {loginType === "account" && (
          <>
            <Form.Item name="username" rules={[{ required: true, message: "请输入你的账号" }]}>
              <Input allowClear prefix={<UserOutlined />} placeholder="账号" />
            </Form.Item>
            <Form.Item name="password" rules={[{ required: true, message: "请输入密码" }]}>
              <Input.Password prefix={<LockOutlined />} type="password" placeholder="密码" />
            </Form.Item>
            <Form.Item name="captcha" rules={[{ required: true, message: "请输入验证码" }]}>
              <Input
                prefix={<SafetyCertificateOutlined />}
                placeholder="验证码"
                suffix={<img className="cursor-pointer" src={codeUrl} />}
              />
            </Form.Item>
            <Form.Item>
              <Space>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox>记住密码</Checkbox>
                </Form.Item>
                <a>忘记密码?</a>
              </Space>
            </Form.Item>
          </>
        )}
        {loginType === "phone" && (
          <>
            <Form.Item name="username" rules={[{ required: true, message: "请输入你的账号" }]}>
              <Input allowClear prefix={<UserOutlined />} placeholder="手机号" />
            </Form.Item>
            <Form.Item name="password" rules={[{ required: true, message: "请输入密码" }]}>
              <Search placeholder="验证码" allowClear enterButton="输入验证码" />
            </Form.Item>
          </>
        )}
        {/* <Form.Item
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
        </Form.Item> */}

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
