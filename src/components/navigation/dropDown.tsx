import React from "react";
import { List, Tabs } from "antd";
import type { TabsProps } from "antd";
import Image from "next/image";
import pic from "src/assets/images/mega-menu-category-01.jpg";

const data1 = [
  "بلوز شلوار",
  "بلوز",
  "سویشرت شلوار",
  "سرهمی",
  "شورت پادار",
  "کاپشن",
  "سه تیکه",
];

const data2 = [
  "شلوار",
  "سویشرت",
  "شومیز",
  "هودی و شلوار",
  "هودی",
  "شورت اسلیپ",
  "رامپر",
];

const Spring = () => (
  <div className="d-flex justify-content-between">
    <div className="d-flex gx-3">
      <div className="px-1" style={{ minWidth: "180px" }}>
        <List
          dataSource={data1}
          renderItem={(item) => <List.Item>{item}</List.Item>}
          split={false}
        />
      </div>

      <div className="px-1" style={{ minWidth: "180px" }}>
        <List
          dataSource={data2}
          renderItem={(item) => <List.Item>{item}</List.Item>}
          split={false}
        />
      </div>
    </div>

    <div className="row g-3 me-5" style={{ maxWidth: "600px" }}>
      <div className="col-12">
        <div className="coverContainer rounded">
          <Image src={pic} alt="pic" className="cover" />
          <p className="subtitle">تخفیف ویژه</p>
        </div>
      </div>
      <div className="col-6">
        <div className="coverContainer rounded">
          <Image src={pic} alt="pic" className="cover" />
          <p className="subtitle">تخفیف ویژه</p>
        </div>
      </div>
      <div className="col-6">
        <div className="coverContainer rounded">
          <Image src={pic} alt="pic" className="cover" />
          <p className="subtitle">تخفیف ویژه</p>
        </div>
      </div>
    </div>
  </div>
);

const items: TabsProps["items"] = [
  {
    key: "1",
    label: "بهاره",
    children: <Spring />,
  },
  {
    key: "2",
    label: "تابستانه",
    children: "Content of Tab Pane 2",
  },
  {
    key: "3",
    label: "پائیزه",
    children: "Content of Tab Pane 3",
  },
  {
    key: "4",
    label: "زمستانه",
    children: "Content of Tab Pane 3",
  },
];

const DropDown: React.FC<any> = ({ current, onMouseLeave }) => {
  if (current == "girls")
    return (
      <section
        className="p-1 border rounded shadow position-absolute w-100 bg-light z-3"
        onMouseLeave={onMouseLeave}
      >
        <Tabs tabPosition="right" defaultActiveKey="1" items={items} />
      </section>
    );

  return;
};

export default DropDown;
