import React from "react";
import { Tabs } from "antd";
import type { TabsProps } from "antd";

const onChange = (key: string) => {
  console.log(key);
};

const items: TabsProps["items"] = [
  {
    key: "1",
    label: "مشخصات",
    children: "Content of Tab Pane 1",
  },
  {
    key: "2",
    label: "نظرات",
    children: "Content of Tab Pane 2",
  },
  {
    key: "3",
    label: "راهنمای سایز",
    children: "Content of Tab Pane 3",
  },
];

const Tab: React.FC = () => (
  <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
);

export default Tab;
