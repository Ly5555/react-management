import React, { useEffect, useMemo, useState } from "react";
import { Input, Modal, Tree } from "antd";

const { Search } = Input;
const getParentKey = (key, tree) => {
    let parentKey;
    for (let i = 0; i < tree.length; i++) {
        const node = tree[i];
        if (node.children) {
            if (node.children.some(item => item.key === key)) {
                parentKey = node.key;
            } else if (getParentKey(key, node.children)) {
                parentKey = getParentKey(key, node.children);
            }
        }
    }
    return parentKey;
};
const AddAlerTree = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [dataList, setDataList] = useState([]);
    const [expandedKeys, setExpandedKeys] = useState([]);
    const [searchValue, setSearchValue] = useState("");
    const [autoExpandParent, setAutoExpandParent] = useState(true);
    const onExpand = newExpandedKeys => {
        setExpandedKeys(newExpandedKeys);
        setAutoExpandParent(false);
    };
    useEffect(() => {
        if (isModalOpen) {
            lib.request({
                url: "/ares-admin/exception/queryContactPersonAndGroup",
                success: res => {
                    setDataList(res);
                },
            });
        }
    }, [isModalOpen]);

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const onChange = e => {
        const { value } = e.target;
        const newExpandedKeys = dataList
            .map(item => {
                if (item.title.indexOf(value) > -1) {
                    return getParentKey(item.key, dataList);
                }
                return null;
            })
            .filter((item, i, self) => item && self.indexOf(item) === i);
        setExpandedKeys(newExpandedKeys);
        setSearchValue(value);
        setAutoExpandParent(true);
    };
    const loop = data => {
        return data.map(item => {
            const strTitle = item.title;
            const index = strTitle.indexOf(searchValue);
            const beforeStr = strTitle.substring(0, index);
            const afterStr = strTitle.slice(index + searchValue.length);
            const title =
                index > -1 ? (
                    <span>
                        {beforeStr}
                        <span className="site-tree-search-value">{searchValue}</span>
                        {afterStr}
                    </span>
                ) : (
                    <span>{strTitle}</span>
                );
            if (item.children) {
                return {
                    title,
                    key: item.key,
                    children: loop(item.children),
                };
            }
            return {
                title,
                key: item.key,
            };
        });
    };

    return (
        <div>
            <a onClick={showModal}>从告警组添加22222222</a>
            <Modal title="添加警告人" visible={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <Search
                    style={{
                        marginBottom: 8,
                    }}
                    placeholder="Search"
                    onChange={onChange}
                />
                <Tree checkable onExpand={onExpand} expandedKeys={expandedKeys} autoExpandParent={autoExpandParent} treeData={dataList} />
            </Modal>
        </div>
    );
};

export default AddAlerTree;
