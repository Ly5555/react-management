/*
 * @Author: liuyongqing
 * @Date: 2023-12-21 21:30:48
 * @LastEditors: liuyongqing
 * @LastEditTime: 2023-12-25 22:04:44
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
      setLoading(true);
      if (api) {
        const { data } = await request({ url: api });
        const newData = data.map((item: any) => ({ label: item.name, value: item.id }));
        setOptions(newData);
      }
    } finally {
      setLoading(false);
    }
  }, [props]);
  useEffect(() => {
    getApiData();
  }, []);
  useEffect(() => {
    // 当有值且列表为空时，自动获取接口
    if (props.value && options.length === 0) {
      getApiData();
    }
  }, [props.value]);
  const onCheckAllChange = (e: any) => {
    let checked = e.target.checked;
    setCheckAllState({ checked: checked, indeterminate: false });
    setSelectValue(checked ? options.map((item) => item.value) : []);
  };
  const handleChange = (value: any) => {
    console.log(value);
    let checked = value.length === options.length;
    setCheckAllState({ checked: checked, indeterminate: value.length !== 0 && !checked });
    setSelectValue(value);
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
    <div>
      <Select
        {...props}
        value={selectValue}
        onChange={handleChange}
        tagRender={tagRender}
        optionFilterProp="label"
        maxTagCount={5}
        style={{ width: "100%" }}
        mode="multiple"
        menuItemSelectedIcon={null}
        dropdownRender={(menu) => {
          return (
            <>
              {
                <div className={"ant-select-item"}>
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
        {options.map((optItem, index) => {
          return (
            <Select.Option key={index} value={optItem.value}>
              <Checkbox style={{ marginRight: 6 }} checked={selectValue?.includes(optItem.value)} />
              {optItem.label}
            </Select.Option>
          );
        })}
      </Select>
    </div>
  );
};

export default ApiAllSelect;
