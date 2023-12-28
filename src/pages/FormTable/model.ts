/*
 * @Author: liuyongqing
 * @Date: 2023-12-19 21:23:59
 * @LastEditors: liuyongqing
 * @LastEditTime: 2023-12-28 20:40:48
 */

// 搜索数据
export const searchList = [
  {
    label: "时间框测试",
    name: "pay_date",
    component: "RangePicker",
    wrapperCol: 250,
    componentProps: {
      allowClear: false,
    },
  },
  {
    label: "全选测试",
    name: "ids",
    params: {
      api: "https://www.fastmock.site/mock/302854084413bb6592dc4c53c7f85991/admin/listExpress",
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
    },
    component: "NormalSelect",

  },
  {
    label: "名字",
    name: "pay_name",
    component: "Input",
    componentProps: {
      allowClear: true,
      maxLength: 10,
    },
  },
];
