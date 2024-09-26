/*
 * @Author: Lyq
 * @Date: 2024-01-20 21:14:09
 * @LastEditors: Lyq
 * @LastEditTime: 2024-03-11 20:25:58
 */
import React, { useCallback, useEffect, useState } from "react";
import { Select } from "antd";
import { lib } from "@/utils/request";

interface IProps {
  api: string;
  labelkey?: string;
  valuekey?: string;
}
const NormalSelect = (props: IProps) => {
  const { api, labelkey, valuekey, ...restProps } = props || {};
  const [options, setOptions] = useState([]);
  const labelKeys = labelkey || "name" || "label";
  const valueKeys = valuekey || "id" || "value";
  const getApiData = useCallback(async () => {
    try {
      if (api) {
        const { data } = await lib.request({ url: api });
        const newData = data.map((item: any) => ({
          label: item[labelKeys],
          value: item[valueKeys],
        }));
        setOptions(newData);
      }
    } finally {
    }
  }, [api]);

  useEffect(() => {
    getApiData();
  }, []);

  return <Select {...restProps} options={options} />;
};

export default NormalSelect;
