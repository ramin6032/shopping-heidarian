"use client";
import React, { useState } from "react";
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import Image from "next/image";
import logo from "src/assets/svg/logo.svg";

const items: MenuProps["items"] = [
  {
    label: <Image src={logo} alt="logo" width={45} />,
    key: "logo",
    disabled: true,
  },
  {
    label: "صفحه اصلی",
    key: "home",
  },
  {
    label: "دخترانه",
    key: "girls",
  },
  {
    label: "پسرانه",
    key: "boys",
  },
  {
    label: "نوزادی",
    key: "kids",
  },
];

const MenuBar: React.FC = () => {
  const [current, setCurrent] = useState("home");

  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };

  return (
    <Menu
      onClick={onClick}
      selectedKeys={[current]}
      mode="horizontal"
      items={items}
    />
  );
};

export default MenuBar;
