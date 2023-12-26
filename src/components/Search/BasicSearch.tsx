import React, { useImperativeHandle } from "react";
import { memo } from "react";
import {
  Button,
  FormProps,
  Input,
  InputNumber,
  AutoComplete,
  Select,
  TreeSelect,
  Checkbox,
  Radio,
  Switch,
  Rate,
  Slider,
  Upload,
  DatePicker,
  Row,
  Col,
} from "antd";
import { Form } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { ApiAllSelect } from "@/components/Select";
const { RangePicker } = DatePicker;
function BasicSearch(props: any) {
  const { list, data, formRef, isLoading, isSearch, children, labelCol, wrapperCol, handleFinish } = props;
  const [form] = Form.useForm();
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
        layout="inline"
        form={form}
        labelCol={labelCol ? labelCol : { span: 8 }}
        wrapperCol={wrapperCol ? wrapperCol : { span: 16 }}
        initialValues={data}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off">
        <Row gutter={[24, 16]}>
          {list?.map((item: any, index: number) => (
            <Col key={index}>
              <Form.Item
                key={`${item.name}_${index}`}
                label={item.label}
                name={item.name}
                labelCol={{ style: { width: item.labelCol } }}
                wrapperCol={{ style: { width: item.wrapperCol } }}
                rules={item.rules ? item.rules : []}>
                {getComponent(item)}
              </Form.Item>
            </Col>
          ))}
          {isSearch !== false && (
            <div style={{ display: "flex" }}>
              <Form.Item>
                <Button type="primary" htmlType="submit" loading={isLoading} icon={<SearchOutlined />}>
                  {"搜索"}
                </Button>
              </Form.Item>
              <Form.Item>
                <Button onClick={onReset} htmlType="submit">
                  {"重置"}
                </Button>
              </Form.Item>
              {children}
            </div>
          )}
        </Row>
      </Form>
    </div>
  );
}
export default memo(BasicSearch);
const componentMap = new Map();

// antd组件注入
componentMap.set("Input", Input);
componentMap.set("RangePicker", BasicRangePicker);
componentMap.set("ApiAllSelect", ApiAllSelect);
export function getComponent(item: any) {
  const { component, componentProps, params } = item;
  const Comp = componentMap.get(component);

  // 获取组件失败直接返回空标签
  if (!Comp) return <></>;
  return (
    <>
      {/* {...initCompProps(component)} */}
      {params ? <Comp {...params} {...componentProps} /> : <Comp {...componentProps} />}
      {item.unit && <span>{item.unit}</span>}
    </>
  );
}

function BasicRangePicker(props: any) {
  const { value } = props;
  const params = { ...props };
  // 如果值不是dayjs类型则进行转换
  if (value) params.value = stringRang2DayjsRang(value);

  return <RangePicker {...params} />;
}

export function stringRang2DayjsRang(value: any) {
  if (!value) return undefined;
  // 当第一个数据都不为Dayjs
  if (value?.length > 1 && dayjs.isDayjs(value?.[0]) && dayjs.isDayjs(value?.[1])) {
    return [dayjs(value[0]), value[1]];
  }

  // 当最后一个数据都不为Dayjs
  if (value?.length > 1 && dayjs.isDayjs(value?.[0]) && !dayjs.isDayjs(value?.[1])) {
    return [value[0], dayjs(value[1])];
  }

  // 当两个数据都不为Dayjs
  if (value?.length > 1 && !dayjs.isDayjs(value?.[0]) && !dayjs.isDayjs(value?.[1])) {
    return [dayjs(value[0]), dayjs(value[1])];
  }
  return value;
}
