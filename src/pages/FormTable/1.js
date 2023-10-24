import React, { useState } from "react";
import { Table, Tooltip } from "antd";

const HOC = {
  widthSearchListRowSpanAble: (rowspanKey, rowspanArray = []) => (WrappedComponent) => {
    if (rowspanKey == null) {
      return WrappedComponent;
    }
    return class extends WrappedComponent {
      renderTable() {
        let { config, dataList: _dataList, table, selectedIdList, sorter } = this.state;
        const dataList = [];
        let list = config.tableFieldList
          .filter((item) => item.fixed != "hide")
          .sort((a, b) => {
            var type = ["left", "show", "right"];
            return type.indexOf(a.fixed) - type.indexOf(b.fixed);
          });
        let columns = list.map((item) => {
          let fixed = item.fixed;
          if (["left", "right"].indexOf(item.fixed) === -1) {
            fixed = undefined;
          }
          var column = {
            title: item.tooltip ? (
              <Tooltip placement="topLeft" title={item.tooltip} arrowPointAtCenter>
                {item.title} <QuestionCircleOutlined />
              </Tooltip>
            ) : (
              item.title
            ),
            dataIndex: item.key,
            width: item.width,
            ellipsis: { showTitle: false },
            fixed: fixed,
            sorter: item.sorter,
            sortOrder: sorter.field == item.key && sorter.order,
            onHeaderCell: (column) => {
              return {
                width: column.width,
                onResize: (e, { size }) => {
                  item.width = size.width;
                  this.setState({ config });
                },
              };
            },
            render: (text, row, index) => {
              const children = item.type == "function" || item.type == "js" ? (item.type == "js" ? eval(item.key) : this[item.key](row, index)) : text;
              if (!rowspanArray.includes(item.key)) {
                if (row.len > 0 && row.index === 0) {
                  return {
                    children,
                    props: {
                      rowSpan: row.len,
                    },
                  };
                } else {
                  return {
                    children,
                    props: {
                      rowSpan: 0,
                    },
                  };
                }
              } else {
                return {
                  children,
                };
              }
            },
          };
          maxWidth += column.width;
          return column;
        });
        let rowSelection = config.page.isBatch && {
          onChange: (selectedIdList, selectedRows) => {
            this.setState({
              selectedIdList,
              selectedRows,
            });
          },
          fixed: true,
          preserveSelectedRowKeys: true,
          selectedRowKeys: selectedIdList,
          getCheckboxProps: this.getCheckboxProps,
          renderCell(checked, record, index, originNode) {
            const leng = record?.[rowspanKey]?.length;
            if (leng > 0 && record.index === 0) {
              return {
                children: originNode,
                props: {
                  rowSpan: leng,
                },
              };
            } else {
              return {
                children: originNode,
                props: {
                  rowSpan: 0,
                },
              };
            }
          },
        };
        let expandable = !this.renderExpandRow
          ? null
          : {
            rowExpandable: (row) => this.renderExpandRow(row, false) != null,
            expandedRowRender: (row, _, __, expanded) => this.renderExpandRow(row, expanded),
          };
        _dataList.map((item, index) => {
          const length = item[rowspanKey]?.length;
          if (length) {
            item[rowspanKey]?.map((i, inde) => {
              const subitem = {
                ...item,
                len: length,
                index: inde,
                _index: `${index}-${inde}`,
                ...i,
              };
              dataList.push(subitem);
            });
          } else {
            item._index = `${index}-${0}`;
            dataList.push(item);
          }
        });

        return (
          <div className="search-list-table">
            <Table
              rowSelection={rowSelection}
              rowKey={"_index"}
              size="small"
              pagination={false}
              expandable={expandable}
              components={{ header: { cell: ResizableTitle } }}
              dataSource={dataList}
              columns={columns}
              onChange={this.handleTableChange}
              scroll={{ x: maxWidth, y: table.height }}
            ></Table>
          </div>
        );
      }
    };
  },
};

export default HOC;
