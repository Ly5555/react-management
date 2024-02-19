/*
 * @Author: liuyongqing
 * @Date: 2024-01-01 20:20:03
 * @LastEditors: Lyq 
 * @LastEditTime: 2024-02-19 20:18:07
 */

// 搜索数据
export const searchList = [
  // {
  //   label: "时间框测试",
  //   name: "pay_date",
  //   component: "RangePicker",
  //   wrapperCol: 300,
  //   componentProps: {
  //     allowClear: false,
  //     style: { width: "100%" },
  //   },
  // },
  {
    label: "全选测试",
    name: "ids",
    params: {
      api: "https://mock.mengxuegu.com/mock/65d344a5351bbd02cf339ac3/listExpress",
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
      api: "https://mock.mengxuegu.com/mock/65d344a5351bbd02cf339ac3/cityv",
      labelkey: "name",
      valuekey: "id",
    },
    component: "NormalSelect",
  },
  {
    label: "简单下拉",
    name: "isHide",
    component: "SimpleSelect",
    wrapperCol: 200,
    params: {
      options: [
        {
          id: true,
          name: "是",
        },
        {
          id: false,
          name: "否",
        },
      ],
    },
    componentProps: {
      allowClear: true,
      maxLength: 10,
    },
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

//表格数据

