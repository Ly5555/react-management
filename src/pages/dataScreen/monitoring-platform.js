// 物流监控平台
import React, { useState, useEffect, useImperativeHandle, forwardRef } from "react";
import { lib, SearchList, getConfigDataUtils, HOC, event } from "react-single-app";
import { useRequest } from "ahooks";
import axios from "axios";
import { Button, Space, Badge, Tag, Modal, message, Radio, Tooltip } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import "./css/monitoring-platform.less";
import MonitoringModal from "./component/monitoringModal";
@HOC.widthSearchListRowSpanAble("goodsList", ["getGoodsList"])
class MonitoringPlatform extends SearchList {
    constructor(props) {
        super(props);
        this.onSearchReset = this.onSearchReset.bind(this);
        this.radioCheckedRef = React.createRef();
    }
    getConfig() {
        let url = getConfigDataUtils.getDataUrlByDataId(587);
        return axios.get(url).then(res => res.data.data);
    }
    componentDidMount() {
        event.on("onSearchReset", this.onSearchReset.bind(this));
    }
    componentWillUnmount() {
        event.off("onSearchReset", this.onSearchReset.bind(this));
    }
    onSearchReset() {
        this.radioCheckedRef.current.resetCheck();
        this.changeImmutable({ statusList: "", collectIgnore: undefined });
    }
    onSearch(search) {
        this.radioCheckedRef.current.logistCountDetails(search);
        this.radioCheckedRef.current.childValues(search.statusList);
    }
    // 渠道订单号
    getOutOrderNo(row) {
        return <a onClick={() => lib.openPage(`/channel-order-detail?globalSystemSn=${row.globalSystemSn}&page_title=渠道订单详情&needRefresh=true`, () => this.load())}>{row.outOrderNo}</a>;
    }
    //商品信息
    getGoodsList(row) {
        return (
            <div className="mom_name" style={{ whiteSpace: "pre-wrap" }}>
                <span className="mom_nameOne">{row.itemName}</span>
                <span className="mom_nameTwo">x{row.count}</span>
            </div>
        );
    }
    // 物流信息
    LogisticsInformation(row) {
        return (
            <div className="logist">
                <span className="logist_spanOne">
                    {row.expressList &&
                        row.expressList.map(item => {
                            return (
                                <div className="logist_spanOne_div">
                                    <span className="logist_spanOne_fir">{item.expressCode}</span>
                                    <MonitoringModal row={row} itemCode={item.expressNo} />
                                </div>
                            );
                        })}
                    {/* {row.expressCode && <span className="logist_spanOne_fir">{row.expressCode}</span>}
                    <MonitoringModal row={row} /> */}
                </span>
                <span className="logist_spanTwo">
                    <span>目的地</span>
                    <span>{row.address}</span>
                </span>
            </div>
        );
    }
    // 物流状态
    getLogisticsStatus(row) {
        const logisticsStatus = [
            { name: "待揽收", color: "#FF9D00", id: 10 },
            { name: "已揽收", color: "#0268FF", id: 15 },
            { name: "运输中", color: "#0268FF", id: 20 },
            { name: "派送中", color: "#0268FF", id: 80 },
            { name: "已签收", color: "#36B336", id: 100 },
            { name: "包裹拦截", color: "#FF2743", id: -10 },
            { name: "退件在途", color: "#FF2743", id: -100 },
            { name: "派送异常", color: "#FF2743", id: -200 },
            { name: "退件签收", color: "#36B336", id: -300 },
        ];
        const status = logisticsStatus.filter(item => item.id === row.logisticsStatus);
        return (
            <>
                {status.length === 0 ? (
                    "-"
                ) : (
                    <div>
                        <Badge color={status[0]?.color} text={status[0]?.name} />
                        <span style={{ marginLeft: 4 }}>{row?.ignoreFlag === true && <Tag color="blue">已忽略</Tag>}</span>
                    </div>
                )}
            </>
        );
    }
    // 售后
    getAfterType(row) {
        if (row.afterType) {
            return row.afterType;
        } else {
            return "-";
        }
    }
    // 发货仓
    getEntityWarehouse(row) {
        if (row.entityWarehouse) {
            return row.entityWarehouse;
        } else {
            return "-";
        }
    }
    // 忽略
    handelIgnoreClick(row) {
        let modal = Modal.confirm({
            title: "提示",
            content: "确定忽略吗？",
            onOk: () => {
                lib.request({
                    url: "/ares-admin/channelOrder/logisticsIgnore",
                    data: { systemGlobalSns: [row.globalSystemSn] },
                    needMask: true,
                    success: res => {
                        message.success("忽略成功");
                        this.load();
                        modal.destroy();
                    },
                });
            },
            onCancel: () => modal.destroy(),
        });
    }
    // 批量忽略
    cancels() {
        let globalSystemSns = this.state.selectedRows.reduce((prev, curr) => prev.concat(curr.globalSystemSn), []);
        if (!globalSystemSns?.length) {
            message.warning("请选择数据");
            return;
        }
        lib.request({
            url: "/ares-admin/channelOrder/logisticsIgnore",
            data: {
                systemGlobalSns: globalSystemSns,
            },
            needMask: true,
            success: res => {
                message.success("批量忽略成功");
                this.load(true);
                this.state.selectedRows = [];
                this.state.selectedIdList = [];
            },
        });
    }
    renderLeftOperation() {
        return (
            <Space>
                <Button onClick={() => this.cancels()}>批量忽略</Button>
            </Space>
        );
    }
    // 接受子组件的value
    getValueChild(values, statusList) {
        const collectIgnore = statusList[0].param.collectIgnore;
        const { search } = this.state;
        if (values === 10) {
            this.changeImmutable({ statusList: [values], collectIgnore: collectIgnore });
            this.setState({
                search: { ...search, statusList: [values], collectIgnore: collectIgnore },
            });
        } else {
            this.changeImmutable({ statusList: [values] });
            this.setState({
                search: { ...search, statusList: [values] },
            });
        }
    }
    renderOperationTopView() {
        return <StorageRadio ref={this.radioCheckedRef} onChange={(values, statusList) => this.getValueChild(values, statusList)} />;
    }
    getCheckboxProps(record) {
        return {
            disabled: record.ignoreBtn === false,
        };
    }
    myOperation(row) {
        return <Space>{row?.ignoreBtn === true ? <a onClick={() => this.handelIgnoreClick(row)}>忽略</a> : "-"}</Space>;
    }
}
export default MonitoringPlatform;
const StorageRadio = forwardRef(({ onChange }, ref) => {
    const [statusList, setStatusList] = useState([]);
    const [value, setStateValue] = useState();
    // 本次轮询不写 发货时间、店铺、用户、发货仓、快递公司、渠道
    function logistCountDetails(search) {
        lib.request({
            url: "/ares-admin/channelOrder/logisticsCount",
            data: {
                entityWarehouseList: search.entityWarehouseList,
                statusList: search.statusList,
                shipAtStart: search.shipAtStart,
                orderBeginTime: search.orderBeginTime,
                orderEndTime: search.orderEndTime,
                fetchBeginTime: search.fetchBeginTime,
                fetchEndTime: search.fetchEndTime,
                shipAtEnd: search.shipAtEnd,
                shopIdList: search.shopIdList,
                expressCodeList: search.expressCodeList,
                appIdList: search.appIdList,
                userIdList: search.userIdList,
            },
            success: res => {
                setStatusList(res);
            },
        });
    }
    // const { data } = useRequest(logistCountDetails, {
    //     pollingInterval: 5000,
    //     pollingWhenHidden: false,
    // });
    useImperativeHandle(ref, () => ({
        resetCheck: resetCheck,
        logistCountDetails: logistCountDetails,
        childValues: setStateValue,
    }));
    const resetCheck = () => {
        setStateValue("");
    };
    const handelRadioChange = e => {
        const values = e.target.value;
        setStateValue(values);
        onChange(values, statusList);
    };

    return (
        <div className="platform">
            <Radio.Group buttonStyle="solid" onChange={handelRadioChange} value={+value?.toString()}>
                {statusList &&
                    statusList?.map((item, index) => {
                        return (
                            <Radio.Button value={item.param.status} style={{ marginLeft: 8, marginTop: 8 }} key={index}>
                                <div className="monitoring">
                                    <div className="monitoring_top">
                                        <span className="monitoring_top_span">{item.title}</span>
                                        {item.tips !== null && (
                                            <Tooltip title={item.tips}>
                                                <QuestionCircleOutlined style={{ fontSize: 12 }} />
                                            </Tooltip>
                                        )}
                                    </div>
                                    <div className="monitoring_num">{item.count}</div>
                                </div>
                            </Radio.Button>
                        );
                    })}
            </Radio.Group>
        </div>
    );
});
