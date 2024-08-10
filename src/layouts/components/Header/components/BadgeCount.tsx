import React, { useState } from "react";
import { Tabs, Badge, Drawer, Empty, Popover } from "antd";
import { BellOutlined } from "@ant-design/icons";
import type { TabsProps } from "antd";
import Notify from "@/assets/message/notify.png";
import information from "@/assets/message/information.png";
import member from "@/assets/message/member.png";
import styles from "../less/badgeCount.module.less";
const BadgeCount = () => {
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
  };
  const imageDate = [
    { key: "Notify", image: Notify, title: "小蜜蜂刚刚一键三连" },
    { key: "information", image: information, title: "小蝴蝶刚刚点了赞" },
    { key: "member", image: member, title: "小乌龟刚刚开通了会员" },
  ];
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "通知（3）",
      children: imageDate.map((item) => (
        <div key={item.key} className={styles.message_item}>
          <img src={item.image} className={styles.message_image} />
          <p className={styles.message_title}>{item.title}</p>
        </div>
      )),
    },
    {
      key: "2",
      label: "消息（0）",
      children: <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={"暂无代办"} />,
    },
    {
      key: "3",
      label: "代办（0）",
      children: <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={"暂无代办"} />,
    },
  ];
  return (
    <div className={styles.badgeCountBox}>
      <Popover
        content={<Tabs defaultActiveKey="1" items={items} />}
        trigger="click"
        open={open}
        onOpenChange={handleOpenChange}>
        <Badge count={3}>
          <BellOutlined style={{ fontSize: 20 }} onClick={showDrawer} />
        </Badge>
      </Popover>
    </div>
  );
};

export default BadgeCount;
