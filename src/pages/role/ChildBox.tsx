/*
 * @Author: Lyq
 * @Date: 2024-03-25 21:36:18
 * @LastEditors: Lyq 
 * @LastEditTime: 2024-04-20 21:53:26
 */
//@ts-nocheck
import React, { useEffect, useState } from "react";
import { Table, Button, Checkbox } from "antd";
import styles from "./childBox.module.less";

const Child = (props) => {
  const { dataList, data2 } = props;
  const [checkedList, setCheckedList] = useState(dataList || []);
  let [checkSet, setCheckSet] = useState(new Set());

  useEffect(() => {
    setCheckSet(new Set([...checkSet]));
  }, []);
  // 处理数据
  const encodeData = (data, depth = 0, parentData = {}) => {
    let result = [];
    data?.forEach((item) => {
      let currentData = {
        ...parentData,
        [depth]: item.id,
        key: item.id,
        buttons: item.buttons,
      };
      if (!item?.children?.length) return result.push(currentData);
      result.push(...encodeData(item.children, depth + 1, currentData));
    });
    return result;
  };

  const getMaxDepth = (data) => {
    let max = 1;
    data?.map((item) => {
      if (item?.children?.length > 0) {
        let childDepth = getMaxDepth(item.children);

        if (max < 1 + childDepth) max = 1 + childDepth;
      }
    });
    return max;
  };
  const generateData = (list) => {
    const dataSource = encodeData(list);
    const maxDepth = getMaxDepth(list);
    const columns = [];
    for (let columnIndex = 0; columnIndex < maxDepth; columnIndex++) {
      columns.push({
        key: columnIndex,
        dataIndex: columnIndex,
        title:
          columnIndex <= 2
            ? `${columnIndex === 0 ? "一级" : columnIndex === 1 ? "二级" : "三级"}菜单`
            : "按钮",
        render: (text) => (
          <span style={{ display: "table-cell", verticalAlign: "middle" }}>
            {text ? <>{getCheckBox(text, list)}</> : ""}
          </span>
        ),
        onCell: (record, rowIndex) => {
          let obj = { rowSpan: 0 };
          //行合并
          if (
            dataSource[rowIndex - 1] &&
            dataSource[rowIndex - 1][columnIndex] === dataSource[rowIndex][columnIndex]
          ) {
            obj.rowSpan = 0;
          } else {
            let rowSpan = 1;
            for (
              let j = 1;
              dataSource[rowIndex + j] &&
              dataSource[rowIndex + j][columnIndex] === dataSource[rowIndex][columnIndex];
              j++
            ) {
              rowSpan++;
            }
            obj.rowSpan = rowSpan;
          }
          return obj;
        },
      });
    }
    return columns;
  };
  const getCheckBox = (text, data) => {
    let obj = {};
    return (
      <Checkbox
        onChange={(e) => {
          handleChecked(e.target.checked, text, data);
        }}
        // indeterminate={indeterminate[cd.key]}
        // indeterminate={mapData(obj, text, data).checked ? false : false}
        checked={mapData(obj, text, data).checked}>
        123
      </Checkbox>
    );
  };
  function isIndeterminate(item, checkSet) {
    return (
      [...item.childKeys, ...item.buttonKeys].some(item => Array.from(checkSet).includes(item)) &&
      !isContain([...checkSet], [...item.childKeys, ...item.buttonKeys])
    );
  }
  const handleChecked = (checked, id, data) => {
    const newCheckData = data.map((item) => {
      if (item.id === id) {
        item.checked = checked;
        if (item?.children?.length) {
          checkAllbtn(checked, item.children);
        }
        if (item.parent_id) {
          //反选/半选
          // reversecheck(checkedList);
          // halfchecked(checkedList);
          // 反选半选
        }
      } else if (item?.children?.length) {
        handleChecked(checked, id, item.children);
      }
      return item;
    });
    setCheckedList(newCheckData);
  };
  // 全选
  const checkAllbtn = (checked, data) => {
    // const newChecked = data.map((item) => {
    //   item.checked = checked;
    //   if (item.children) {
    //     checkAllbtn(checked, item.children);
    //   }
    //   return item;
    // });
    // setCheckedList(newChecked);
  };
  // 反选
  // const reversecheck = (list) => {
  //   const newCheckData = list.map((item) => {
  //     if (item?.children?.length) {
  //       // 用数组的方法，全部都为true才为true
  //       let flag = item?.children.every((item) => item.checked);
  //       item.checked = flag;
  //       reversecheck(item.children);
  //     }
  //   });
  //   setCheckedList(newCheckData);
  // };
  //半选
  // const halfchecked = (list) => {
  //   const newCheckData = list.map((item) => {
  //     if (item?.children?.length) {
  //       // 用数组的方法，有一个为true就为true,这里一定要加上|| item.halfchecked，因为如果是半选状态，它的父级也应该是半选状态，不加会导致三个层级以上出现bug
  //       let flag = item?.children.some((item) => item.checked);
  //       item.checked = flag;
  //       // 再递归
  //       halfchecked(item.children);
  //     }
  //   });
  //   setCheckedList(newCheckData);
  // };
  const mapData = (obj, id, list) => {
    list.map((item) => {
      //如果id相等，则把整个对象赋给ogj,否则如果有子数据就递归
      if (item.id === id) {
        obj = item;
      } else if (item.children) {
        obj = mapData(obj, id, item.children);
      }
    });
    //最后将对象返回
    return obj;
  };
  function getChildKey(obj) {
    return (
      obj.list?.reduce((prev, curr) => {
        if (curr.id) {
          return prev.concat([curr.id], getChildKey(curr));
        } else {
          return prev.concat(getChildKey(curr));
        }
      }, []) || []
    );
  }
  return (
    <div className={styles.childBox}>
      <Button type="primary" style={{ marginBottom: 8 }}>
        保存
      </Button>
      <Table
        columns={generateData(dataList)}
        bordered
        rowKey={(record) => record.key}
        size="small"
        pagination={false}
        dataSource={encodeData(checkedList)}
      />
    </div>
  );
};
export default Child;
