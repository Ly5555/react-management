/*
 * @Author: liuyongqing
 * @Date: 2023-12-27 20:28:22
 * @LastEditors: liuyongqing
 * @LastEditTime: 2023-12-28 20:45:25
 */
import React, { useCallback, useEffect, useState } from "react";
import { Select } from "antd";
import request from "@/utils/request";

const NormalSelect = (props: any) => {
  const { api } = props || {};
  const [options, setOptions] = useState([]);
  const getApiData = useCallback(async () => {
    try {
      if (api) {
        const { data } = await request({ url: api });
        const newData = data.map((item: any) => ({ label: item.name, value: item.id }));
        setOptions(newData);
      }
    } finally {
    }
  }, [api]);
  useEffect(() => {
    getApiData();
  }, []);
  return (
    <>
      <Select {...props} options={options} />
    </>
  );
};

export default NormalSelect;
