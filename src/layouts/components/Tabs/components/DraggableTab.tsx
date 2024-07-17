/*
 * @Author: Lyq
 * @Date: 2023-11-17 22:15:44
 * @LastEditors: Lyq
 * @LastEditTime: 2024-07-17 21:24:41
 */
import React, { memo, useEffect, useState } from "react";
import type { DragEndEvent } from "@dnd-kit/core";
import { DndContext, PointerSensor, useSensor } from "@dnd-kit/core";
import {
  arrayMove,
  horizontalListSortingStrategy,
  SortableContext,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { restrictToHorizontalAxis } from "@dnd-kit/modifiers";
import { Tabs, TabsProps } from "antd";
import { useTabLists } from "@/stores";
interface DraggableTabPaneProps extends React.HTMLAttributes<HTMLDivElement> {
  items: never[];
  "data-node-key": string;
}

const DraggableTabNode = (props: DraggableTabPaneProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: props["data-node-key"],
  });

  const style: React.CSSProperties = {
    ...props.style,
    transform: CSS.Transform.toString(transform && { ...transform, scaleX: 1 }),
    transition,
  };

  return React.cloneElement(props.children as React.ReactElement, {
    ref: setNodeRef,
    style,
    ...attributes,
    ...listeners,
  });
};
const DraggableTab = (props: TabsProps) => {

  const { items:tabsItem } = props || {};
  const items = tabsItem ?? [];
  const sensor = useSensor(PointerSensor, {
    activationConstraint: { distance: 10 },
  });
  // 拖拽
  const onDragEnd = ({ active, over }: DragEndEvent) => {
    if (active.id !== over?.id) {
      const activeIndex = items.findIndex((i) => i.key === active.id);
      const overIndex = items.findIndex((i) => i.key === over?.id);
      const newItems = arrayMove(items, activeIndex, overIndex);
      useTabLists.setState((prevState) => ({tabList: arrayMove(prevState.tabList, activeIndex, overIndex)}));
      return newItems
    }
  };

  // 渲染TabBar
  const renderTabBar: TabsProps["renderTabBar"] = (props, DefaultTabBar) => {
    return (
      <DndContext sensors={[sensor]} onDragEnd={onDragEnd} modifiers={[restrictToHorizontalAxis]}>
        <SortableContext items={items?.map((i) => i.key)} strategy={horizontalListSortingStrategy}>
          <DefaultTabBar {...props}>
            {(node) => (
              <DraggableTabNode {...node.props} key={node.key}>
                {node}
              </DraggableTabNode>
            )}
          </DefaultTabBar>
        </SortableContext>
      </DndContext>
    );
  };
  return (
    <Tabs
      renderTabBar={renderTabBar}
      {...props}
      items={items}
      className="tab-layout"
    />
  );
};

export default memo(DraggableTab);
