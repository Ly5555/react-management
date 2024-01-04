/*
 * @Author: Lyq
 * @Date: 2023-12-21 21:30:48
 * @LastEditors: Lyq
 * @LastEditTime: 2024-01-04 22:24:08
 */

import React, { useCallback, useEffect, useState } from "react";
import { Select } from "antd";
import type { SelectProps } from "antd";
interface IProps {
  options: {}[];
  labelkey?: string;
  valuekey?: string;
}
const SimpleSelect = (props: IProps) => {
  const { options, labelkey, valuekey, ...restProps } = props || { options: [] };
  const labelKeys = labelkey || "name" || "label";
  const valueKeys = valuekey || "id" || "value";
  const [value, setValue] = useState<SelectProps[]>([]);
  useEffect(() => {
    if (options) {
      // const selectValue = options.map(({ [labelKeys]: label, [valueKeys]: value }) => ({ label, value }));
      const selectValue = options.map((item: any) => ({ label: item[labelKeys], value: item[valueKeys] }));
      setValue(selectValue);
    }
  }, [options]);

  return <Select options={value} {...restProps} />;
};

export default SimpleSelect;
