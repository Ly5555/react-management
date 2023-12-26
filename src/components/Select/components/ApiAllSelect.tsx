/*
 * @Author: liuyongqing
 * @Date: 2023-12-21 21:30:48
 * @LastEditors: liuyongqing
 * @LastEditTime: 2023-12-26 21:13:49
 */
import React, { useState, useEffect, useCallback } from "react";
import { Checkbox, Divider, Select } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import request from "@/utils/request";

const ApiAllSelect = (props: any) => {
  const { api } = props || {};
  const [checkAllState, setCheckAllState] = useState({ checked: false, indeterminate: false });
  const [options, setOptions] = useState([]);
  const [selectValue, setSelectValue] = useState([]);
  const [isLoading, setLoading] = useState(false);
  /** 获取接口数据 */
  const getApiData = useCallback(async () => {
    try {
      if (api) {
        const { data } = await request({ url: api });
        const newData = data.map((item: any) => ({ label: item.name, value: item.id }));
        setOptions(newData);
      }
    } finally {
    }
  }, [props]);
  useEffect(() => {
    getApiData();
  }, []);
  const onCheckAllChange = (e: any) => {
    let checked = e.target.checked;
    setCheckAllState({ checked: checked, indeterminate: false });
    setSelectValue(checked ? options.map((item: any) => item.value) : []);
    props.onChange?.(checked ? options.map((item: any) => item.value) : []);
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
        <span className="ant-select-selection-item-content">{Array.isArray(label) ? label[1] : label}</span>
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
    <Select
      {...props}
      value={selectValue}
      onChange={handleChange}
      tagRender={tagRender}
      optionFilterProp="children"
      mode="multiple"
      menuItemSelectedIcon={null}
      dropdownRender={(menu) => {
        return (
          <>
            {
              <div className="ant-select-item">
                <Checkbox
                  onChange={onCheckAllChange}
                  checked={checkAllState.checked}
                  indeterminate={checkAllState.indeterminate}>
                  全选
                </Checkbox>
                <Divider style={{ margin: "5px 0" }} />
              </div>
            }
            {menu}
          </>
        );
      }}>
      {!!options &&
        options.map((item: any, index) => {
          return (
            <Select.Option key={index} value={item.value}>
              <Checkbox style={{ marginRight: 6 }} checked={selectValue?.includes(item?.value)} />
              {item?.label}
            </Select.Option>
          );
        })}
    </Select>
  );
};

export default ApiAllSelect;
