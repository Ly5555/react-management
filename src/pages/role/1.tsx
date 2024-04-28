//@ts-nocheck
import { useEffect, useState } from "react";
import { Checkbox, Table, Button, message } from "antd";
// import { postaddpermission } from "../../../api/permissionGroup";
expimport { Checkbox } from 'antd';
ort default function RoleList(props) {
  const [dataSource1, setdataSource] = useState();
  const [columns1, setcolumns] = useState();
  const [ccType, setccType] = useState(false);
  const columnWidthArray = ["10%", "10%", "30%", "25%", "25%"];

  //第二步，编码Data, 转成表格格式
  const encodeData = (data, i = 0, addData = {}) => {
    let ret = [];
    // eslint-disable-next-line array-callback-return
    data?.map((item) => {
      let next = Object.assign({ [i]: item.permission_id }, addData);
      //如果有子数据
      if (item.childPermissions) {
        ret.push(...encodeData(item.childPermissions, i + 1, next));
      } else {
        ret.push(next);
      }
    });
    return ret;
  };

  //第三步，获取最深的深度以确定列数
  const getMaxDepth = (data) => {
    let max = 1;
    data?.map((item) => {
      if (item.childPermissions) {
        let childDepth = getMaxDepth(item.childPermissions);
        if (max < 1 + childDepth) max = 1 + childDepth;
      }
    });
    return max;
  };

  //第一步，这里面就是将antd表格改成权限组选择想要的样子，并且调了一下方法
  const generateData = (list) => {
    //转换格式后生成的表格数据
    const dataSource = encodeData(list);
    //最大深度, 用于确认表格列数
    const max = getMaxDepth(list);
    const columns = [];
    for (let i = 0; i < max; i++) {
      columns.push({
        key: i,
        dataIndex: i,
        title: i,
        width: columnWidthArray[i],
        render: (t, r, rowIndex) => {
          const obj = {
            children: t ? getCheckBox(t, list) : "",
            props: {},
          };
          //列合并
          if (r[i] === undefined) {
            obj.props.colSpan = 0;
          } else if (r[i + 1] === undefined && i < max - 1) {
            obj.props.colSpan = max - i;
          }
          //行合并
          if (dataSource[rowIndex - 1] && dataSource[rowIndex - 1][i] === dataSource[rowIndex][i]) {
            obj.props.rowSpan = 0;
          } else {
            let rowSpan = 1;
            for (
              let j = 1;
              dataSource[rowIndex + j] && dataSource[rowIndex + j][i] === dataSource[rowIndex][i];
              j++
            ) {
              rowSpan++;
            }
            obj.props.rowSpan = rowSpan;
          }
          return obj;
        },
      });
    }
    setdataSource(dataSource);
    setcolumns(columns);
  };

  //第五步，利用id获取整个对象
  //obj：传入的一个空对象
  //id：传入的数据id
  //list：整个权限的数据，是一个数组对象的格式
  const mapData = (obj, id, list) => {
    list.map((item) => {
      //如果id相等，则把整个对象赋给ogj,否则如果有子数据就递归
      if (item.permission_id === id) {
        obj = item;
      } else if (item.childPermissions) {
        obj = mapData(obj, id, item.childPermissions);
      }
    });
    //最后将对象返回
    return obj;
  };

  //第九步，半选
  //list:总数据
  const halfchecked = (list) => {
    list.map((item) => {
      if (item.childPermissions) {
        // 用数组的方法，有一个为true就为true,这里一定要加上|| item.halfchecked，因为如果是半选状态，它的父级也应该是半选状态，不加会导致三个层级以上出现bug
        let flag = item.childPermissions.some((item) => item.IsObtain || item.halfchecked);
        item.halfchecked = flag;
        // 再递归
        halfchecked(item.childPermissions);
      }
    });
  };

  //第八步，反选
  //list:总数据
  const reversecheck = (list) => {
    list.map((item) => {
      if (item.childPermissions) {
        // 用数组的方法，全部都为true才为true
        let flag = item.childPermissions.every((item) => item.IsObtain);
        item.IsObtain = flag;
        // 再递归
        reversecheck(item.childPermissions);
      }
    });
  };

  //第七步，全选
  //checked:选择框状态，data:数据
  const checkAllbtn = (checked, data) => {
    data.map((item) => {
      item.IsObtain = checked;
      if (item.childPermissions) {
        checkAllbtn(checked, item.childPermissions);
      }
    });
  };

  const Checkbox=()=>{
    
  }

  //第六步，点击选择框
  //data:总数据，checked：选择框的状态，id：当前数据的id
  const checkedItem = (data, checked, id) => {
    //把传过来的数据进行遍历
    return data.map((item) => {
      //如果id相等就把数据的IsObtain字段改成当前选择框的状态
      if (item.permission_id === id) {
        item.IsObtain = checked;
        //全选，如果有子数据就调全选的方法
        if (item.childPermissions) {
          checkAllbtn(checked, item.childPermissions);
        }
        //如果父id不会空，那就说明点击的是子选择框，就要进行反选和半选
        if (item.permission_pid !== "null") {
          //反选/半选
          reversecheck(props.dataList);
          halfchecked(props.dataList);
        }
      }
      //递归，如果有子数据就进行递归
      else if (item.childPermissions) {
        checkedItem(item.childPermissions, checked, id);
      }
      return item;
    });
  };

  //第四步，渲染选择框
  //t:当前数据的id, data:总的数据
  const getCheckBox = (t, data) => {
    let obj = {};
    // //页面加载的时候调用一次
    // halfchecked(props.dataList)
    // reversecheck(props.dataList)
    return (
      <Checkbox
        //是否选中，mapData(obj, t, props.dataList)为获取id相等的对象，IsObtain为数据里面的一个字段，默认为false，当点击选择框的时候会改为true
        checked={mapData(obj, t, props.dataList).IsObtain}
        //是否为半选状态，halfchecked也是数据里的一个字段，作用是判断是否为半选状态，
        //IsObtain和halfchecked这两个字段都是前端拿到数据之后自己递归加进去的，如果后端给就更好了,
        //首先判断数据里的IsObtain字段是否为true,如果是就选中了，就没有半选什么事了，否则才看halfchecked字段是否为true
        indeterminate={
          mapData(obj, t, props.dataList).IsObtain
            ? false
            : mapData(obj, t, props.dataList).halfchecked
        }
        onChange={(e) => {
          // ccType这个的作用就是在点击选择框后重新渲染一下，默认是false,然后每次取反，在useEffect里面监听ccType，就可以取到强制刷新的作用了
          setccType(!ccType);
          //点击选择框后调用的方法
          checkedItem(data, e.target.checked, mapData(obj, t, props.dataList).permission_id);
          // console.log(props.dataList);
          //每次点击完都会改变数据里面IsObtain和halfchecked的状态，所有需要再重置一下数据，如果在useEffect里面也监听了props.dataList，就可以不用上面那个ccType了，我是两个都保留了
          props.setdataList(props.dataList);
        }}>
        {/*这里显示权限的名字*/}
        {mapData(obj, t, props.dataList).permission_name}
      </Checkbox>
    );
  };

  //挂载
  useEffect(() => {
    //初始化页面将数据传入
    generateData(props.dataList);
    //页面加载的时候调用一次
    halfchecked(props.dataList);
    reversecheck(props.dataList);
  }, [props.dataList, ccType]);

  //第十一步，获取选择的数据id
  //list,总数据，arr:空数组
  const getData = (list, arr) => {
    list.map((item) => {
      if (item.IsObtain || item.halfchecked) {
        arr.push(item.permission_id);
      }
      if (item.childPermissions) {
        getData(item.childPermissions, arr);
      }
    });
  };

  //第十步，点击保存,这里就是点击保存将全选或者半选的id都传给后端
  const addPermission = async () => {
    const arr = [];
    getData(props.dataList, arr);
    //打印获取到的id
    console.log(arr);
  };

  return (
    <div>
      <div
        style={{
          position: "sticky",
          textAlign: "right",
          height: "40px",
          lineHeight: "40px",
        }}>
        <Button type="primary" onClick={addPermission}>
          保存
        </Button>
      </div>
      <div>
        <Table
          bordered
          pagination={false}
          scroll={{ y: true }}
          showHeader={false}
          dataSource={dataSource1}
          columns={columns1}
        />
      </div>
    </div>
  );
}
