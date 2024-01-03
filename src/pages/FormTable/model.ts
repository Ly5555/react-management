/*
 * @Author: liuyongqing
 * @Date: 2024-01-01 20:20:03
 * @LastEditors: liuyongqing
 * @LastEditTime: 2024-01-03 21:02:10
 */

// 搜索数据
export const searchList = [
  {
    label: "时间框测试",
    name: "pay_date",
    component: "RangePicker",
    wrapperCol: 300,
    componentProps: {
      allowClear: false,
      style: { width: "100%" },
    },
  },
  {
    label: "全选测试",
    name: "ids",
    params: {
      api: "https://www.fastmock.site/mock/302854084413bb6592dc4c53c7f85991/admin/listExpress",
      // labelkey: "name",
      // valuekey: "id",
    },
    wrapperCol: 200,
    component: "ApiAllSelect",
    componentProps: {
      maxTagCount: 1,
      allowClear: true,
    },
  },
  {
    label: "测试单选",
    name: "userId",
    wrapperCol: 200,
    params: {
      api: "https://www.fastmock.site/mock/302854084413bb6592dc4c53c7f85991/admin/city",
      labelkey: "name",
      valuekey: "id",
    },
    component: "NormalSelect",

  },
  {
    label: "名字",
    name: "pay_name",
    wrapperCol: 200,
    component: "Input",
    componentProps: {
      allowClear: true,
      maxLength: 10,
    },
  },
  {
    label: "名字2",
    name: "pay_name2",
    component: "Input",
    wrapperCol: 200,
    componentProps: {
      allowClear: true,
      maxLength: 10,
    },
  },
  {
    label: "名字3",
    name: "pay_name3",
    wrapperCol: 200,
    component: "Input",
    componentProps: {
      allowClear: true,
      maxLength: 10,
    },
  },
  {
    label: "名字4",
    name: "pay_name4",
    wrapperCol: 200,
    component: "Input",
    componentProps: {
      allowClear: true,
      maxLength: 10,
    },
  },
  {
    label: "名字5",
    name: "pay_name5",
    component: "Input",
    componentProps: {
      allowClear: true,
      maxLength: 10,
    },
  },
  {
    label: "名字6",
    name: "pay_name6",
    wrapperCol: 200,
    component: "Input",
    componentProps: {
      allowClear: true,
      maxLength: 10,
    },
  },
  {
    label: "名字7",
    name: "pay_name7",
    wrapperCol: 200,
    component: "Input",
    componentProps: {
      allowClear: true,
      maxLength: 10,
    },
  },
  {
    label: "名字8",
    name: "pay_name8",
    wrapperCol: 200,
    component: "Input",
    componentProps: {
      allowClear: true,
      maxLength: 10,
    },
  },
];
