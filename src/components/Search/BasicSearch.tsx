/*
 * @Author: Lyq
 * @Date: 2024-01-06 14:56:15
 * @LastEditors: Lyq
 * @LastEditTime: 2024-03-10 21:45:48
 */
import React, { useImperativeHandle, useMemo, useState, memo } from "react";
import { Button, FormProps, Row, Col, Space } from "antd";
import { Form } from "antd";
import { DownOutlined, SearchOutlined } from "@ant-design/icons";
import { GetComponent } from "@/components/Form";

function BasicSearch(props: any) {
  const [expand, setExpand] = useState(false);
  const { list, data, isLoading, isSearch, children, labelCol, wrapperCol, handleFinish } = props;
  const [form] = Form.useForm();

  const renderlist = useMemo(() => {
    const filteredList = expand ? list : list?.slice(0, 6);

    return filteredList.map((item: any, index: number) => (
      <Col xs={8} lg={8} xl={8} xxl={6} key={`${item.name}_${index}`}>
        <Form.Item
          key={`${item.name}`}
          label={item.label}
          name={item.name}
          labelCol={{ style: { width: item.labelCol ? item.labelCol : 80 } }}
          wrapperCol={{ style: { width: item.wrapperCol ? item.wrapperCol : 200 } }}
          rules={item.rules ? item.rules : []}>
          {GetComponent(item)}
        </Form.Item>
      </Col>
    ));
  }, [expand, list]);
  /**
   * 提交表单
   * @param values - 表单值
   */
  const onFinish: FormProps["onFinish"] = (values) => {
    if (handleFinish) {
      handleFinish?.(values);
    }
  };
  const onReset = () => {
    form.resetFields();
  };
  /**
   * 表单提交失败处理
   * @param errorInfo - 错误信息
   */
  const onFinishFailed: FormProps["onFinishFailed"] = (errorInfo) => {
    console.warn("搜索错误:", errorInfo);
  };

  return (
    <div id="searches">
      <Form
        form={form}
        labelCol={labelCol ? labelCol : { span: 8 }}
        wrapperCol={wrapperCol ? wrapperCol : { span: 16 }}
        initialValues={data}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off">
        <Row gutter={24}>{renderlist}</Row>

        {isSearch !== false && (
          <div style={{ textAlign: "right" }}>
            <Space size="small">
              <Button
                type="primary"
                htmlType="submit"
                loading={isLoading}
                icon={<SearchOutlined />}>
                {"搜索"}
              </Button>
              <Button onClick={onReset} htmlType="submit">
                {"重置"}
              </Button>
              <a
                style={{ fontSize: 12 }}
                onClick={() => {
                  setExpand(!expand);
                }}>
                {list && list.length >= 6 ? (
                  <>
                    <DownOutlined rotate={expand ? 180 : 0} />
                    {expand ? "收起" : "展开"}
                  </>
                ) : null}
              </a>
            </Space>
          </div>
        )}
      </Form>
    </div>
  );
}
export default memo(BasicSearch);
