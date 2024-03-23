/*
 * @Author: Lyq
 * @Date: 2023-11-17 22:15:44
 * @LastEditors: Lyq
 * @LastEditTime: 2024-03-09 09:32:37
 */
import React, { useEffect, useState } from "react";
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
  const sensor = useSensor(PointerSensor, {
    activationConstraint: { distance: 10 },
  });

  const { items } = props;
  const [tabItem, setTabItems] = useState(items || []);

  useEffect(() => {
    setTabItems(props.items || []);
  }, [items]);

  // 拖拽
  const onDragEnd = ({ active, over }: DragEndEvent) => {
    if (active.id !== over?.id) {
      setTabItems((prev) => {
        const activeIndex = prev.findIndex((i) => i.key === active.id);
        const overIndex = prev.findIndex((i) => i.key === over?.id);
        return arrayMove(prev, activeIndex, overIndex);
      });
    }
  };
  // 渲染TabBar
  const renderTabBar: TabsProps["renderTabBar"] = (props, DefaultTabBar) => {
    return (
      <DndContext sensors={[sensor]} onDragEnd={onDragEnd} modifiers={[restrictToHorizontalAxis]}>
        <SortableContext items={tabItem.map((i) => i.key)} strategy={horizontalListSortingStrategy}>
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
  return <Tabs renderTabBar={renderTabBar} {...props} items={tabItem} className="tab-layout" />;
};

export default DraggableTab;
