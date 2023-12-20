/*
 * @Author: liuyongqing
 * @Date: 2023-07-11 19:19:04
 * @LastEditors: liuyongqing
 * @LastEditTime: 2023-12-19 21:13:22
 */
import React, { Children, useCallback, useEffect, useState } from "react";
import { Son } from "./components";
import Grandp from "./components/Grandpa";
import { Button, Checkbox, Divider } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import request from "@/utils/request";
import welcome from "@/assets/images/welcome.png";
import { useRequest } from "ahooks";
import styles from "./index.mouule.less";
import { Select } from "antd";

enum cardType {
  DEFAULT = "default",
  MIX = "mix",
  ITEM = "item",
}
interface ISubSectionData {
  name: string;
  age: number;
  cardType: string;
}
const Home = () => {
  const [checkAllState, setCheckAllState] = useState({ checked: false, indeterminate: false });
  const [checkedList, setCheckedList] = useState([]);
  const [options, setOptions] = useState([]);
  const [selectData, setSelectData] = useState([]);
  const optionUrl = "https://www.fastmock.site/mock/302854084413bb6592dc4c53c7f85991/admin/listExpress";
  useEffect(() => {
    const fetchData = async () => {
      const { data } = (await request({ url: optionUrl })) || [];
      const options = data.map((item: any) => ({ label: item.name, value: item.id }));
      setOptions(options);
    };
    fetchData().catch(console.error);
  }, []);
  const details = [
    { name: "1", age: 13, cardType: "default" },
    { name: "2", age: 23, cardType: "mix" },
    { name: "3", age: 33, cardType: "item" },
  ];

  const renderCard = useCallback((card: ISubSectionData, key: number) => {
    const { cardType: type } = card || {};
    switch (type) {
      case cardType.DEFAULT:
        return <Son data={card} key={key} />;
      case cardType.MIX:
        return <Son data={card} key={key} />;
      case cardType.ITEM:
        return <Son data={card} key={key} />;
      default:
        return null;
    }
  }, []);
  const onCheckAllChange = (e: any) => {
    let checked = e.target.checked;
    setCheckAllState({ checked: checked, indeterminate: false });
    setSelectData(checked ? options.map((item) => item.value) : []);
  };
  const handleChange = (value: any) => {
    let checked = value.length === options.length;
    setCheckAllState({ checked: checked, indeterminate: value.length !== 0 && !checked });
    setSelectData(value);
  };
  const tagRender = (props) => {
    const { label, value, closable, onClose } = props;
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
    <>
      {details && details.map((item, index) => renderCard(item, index))}
      {/* <NormalSelect optionsApi={optionUrl} mode="multiple" allowClear style={{ width: "100%" }} />
       */}
      {/* 测试 */}
      <Select
        allowClear
        onChange={handleChange}
        value={selectData}
        tagRender={tagRender}
        optionFilterProp="children"
        maxTagCount={10}
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
              <Checkbox style={{ marginRight: 6 }} checked={selectData?.includes(optItem.value)} />
              {optItem.label}
            </Select.Option>
          );
        })}
      </Select>
    </>
  );
};
interface IProps {
  value?: string;
  onChange?: (value: string) => void;
  optionsApi: string;
}

export default Home;
