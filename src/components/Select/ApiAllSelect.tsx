/*
 * @Author: Lyq
 * @Date: 2023-12-21 21:30:48
 * @LastEditors: Lyq
 * @LastEditTime: 2024-03-11 20:24:14
 */

import React, { useState, useEffect, useCallback } from "react";
import { Checkbox, Divider, Select } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { lib } from "@/utils/request";

const ApiAllSelect = (props: any) => {
  const { api, labelkey, valuekey } = props || {};
  const [checkAllState, setCheckAllState] = useState({ checked: false, indeterminate: false });
  const [options, setOptions] = useState([]);
  const [selectValue, setSelectValue] = useState([]);
  const labelKeys = labelkey || "name" || "label";
  const valueKeys = valuekey || "id" || "value";

  /** 获取接口数据 */
  const getApiData = useCallback(async () => {
    try {
      if (api) {
        const { data } = await lib.request({ url: api });
        setOptions(data);
      }
    } finally {
    }
  }, [props]);
  useEffect(() => {
    getApiData();
  }, []);
  useEffect(() => {
    if (props.value) {
      setSelectValue(props.value);
    }
  }, [props.value]);

  const onCheckAllChange = (e: any) => {
    let checked = e.target.checked;
    setCheckAllState({ checked: checked, indeterminate: false });
    setSelectValue(checked ? options.map((item: any) => item[valueKeys]) : []);
    props.onChange?.(checked ? options.map((item: any) => item[valueKeys]) : []);
  };
  const handleChange = (value: any) => {
    let checked = value.length === options.length;
    setCheckAllState({ checked: checked, indeterminate: value.length !== 0 && !checked });
    setSelectValue(value);
    props.onChange?.(value);
  };

  const tagRender = (props: any) => {
    const { label, onClose } = props;
    const onPreventMouseDown = (event: any) => {
      event.preventDefault();
      event.stopPropagation();
    };
    return (
      <span className="ant-select-selection-item">
        <span className="ant-select-selection-item-content">
          {Array.isArray(label) ? label[1] : label}
        </span>
        <span
          className="ant-select-selection-item-remove"
          style={{ userSelect: "none", verticalAlign: "0" }}
          onMouseDown={onPreventMouseDown}
          onClick={() => {
            onClose();
          }}>
          <CloseOutlined />
        </span>
      </span>
    );
  };

  return (
    <>
      <Select
        value={selectValue}
        {...props}
        onChange={handleChange}
        optionFilterProp="children"
        mode="multiple"
        tagRender={tagRender}
        menuItemSelectedIcon={null}
        dropdownRender={(menu: any) => {
          return (
            <>
              <div className="ant-select-item">
                <Checkbox
                  onChange={onCheckAllChange}
                  checked={checkAllState.checked}
                  indeterminate={checkAllState.indeterminate}>
                  全选
                </Checkbox>
                <Divider style={{ margin: "5px 0" }} />
              </div>
              {menu}
            </>
          );
        }}>
        {!!options &&
          options.map((item: any, index) => {
            return (
              <Select.Option key={index} value={item[valueKeys]}>
                <Checkbox
                  style={{ marginRight: 6 }}
                  checked={selectValue?.includes(item[valueKeys])}
                />
                {item[labelKeys]}
              </Select.Option>
            );
          })}
      </Select>
    </>
  );
};

export default ApiAllSelect;
