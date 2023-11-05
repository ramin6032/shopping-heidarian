"use client";
import { ConfigProvider } from "antd";
import Navigation from "./navigation/navigation";

export default function App(params: type) {
  return (
    <ConfigProvider
      direction="rtl"
      theme={{
        token: {
          fontFamily: "Vazirmatn, tahoma",
        },
      }}
    >
      <Navigation />
      <p>salam</p>
    </ConfigProvider>
  );
}
