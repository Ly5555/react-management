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
} from "antd";
import { Form } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { filterDayjs } from "./helper";
const { RangePicker } = DatePicker;
function BasicSearch(props: any) {
  const { list, data, formRef, isLoading, isSearch, children, labelCol, wrapperCol, handleFinish } = props;
  const [form] = Form.useForm();
  // 抛出外部方法
  useImperativeHandle(
    formRef,
    () =>
      ({
        /**
         * 获取表单值
         * @param key - 表单唯一值
         */
        getFieldValue: (key: string) => {
          return form.getFieldValue(key);
        },
        /** 获取表单全部值 */
        getFieldsValue: () => {
          return form.getFieldsValue();
        },
        /** 重置表单 */
        handleReset: () => {
          form.resetFields();
        },
        /** 提交表单  */
        handleSubmit: () => {
          form.submit();
        },
      } as any),
  );

  /**
   * 提交表单
   * @param values - 表单值
   */
  const onFinish: FormProps["onFinish"] = (values) => {
    if (handleFinish) {
      // 将dayjs类型转为字符串
      const params = filterDayjs(values, list);
      handleFinish?.(params);
    }
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
        {list?.map((item: any, index: number) => (
          <Form.Item
            key={`${item.name}_${index}`}
            label={item.label}
            name={item.name}
            labelCol={{ style: { width: item.labelCol } }}
            wrapperCol={{ style: { width: item.wrapperCol } }}
            rules={item.rules}>
            {getComponent(item)}
          </Form.Item>
        ))}
        <div>
          {isSearch !== false && (
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="!mb-5px"
                loading={isLoading}
                icon={<SearchOutlined />}>
                {"搜索"}
              </Button>
            </Form.Item>
          )}
          {children}
        </div>
      </Form>
    </div>
  );
}
export default memo(BasicSearch);
const componentMap = new Map();

// antd组件注入
componentMap.set("RangePicker", BasicRangePicker);

export function getComponent(item: any) {
  const { component, componentProps } = item;
  const Comp = componentMap.get(component);
  // 获取组件失败直接返回空标签
  if (!Comp) return <></>;
  return (
    <>
      {/* {...initCompProps(component)}  */}
      <Comp {...componentProps} />
      {item.unit && <span>{item.unit}</span>}
    </>
  );
}
// export function initCompProps(component: any): any {
//   console.log(component, "148");

//   switch (component) {
//     // 下拉框
//     case "Select":
//       return {
//         allowClear: true,
//         placeholder: "public.inputPleaseSelect",
//       };

//     // 数字框
//     case "InputNumber":
//       return {
//         placeholder: "public.inputPleaseEnter",
//       };

//     // 勾选框
//     case "Checkbox":
//       return {};

//     // 勾选框组
//     case "CheckboxGroup":
//       return {};
//     // 日期区间
//     case "RangePicker":
//       return {
//         // placeholder: ["开始", "结束"],
//         // format: [],
//       };
//     default:
//       return {
//         allowClear: true,
//         placeholder: "public.inputPleaseEnter",
//       };
//   }
// }
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
