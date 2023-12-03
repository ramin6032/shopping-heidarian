"use client";
import { ConfigProvider } from "antd";
import Navigation from "./navigation/navigation";
import Carousel from "./carousel/carousel";
import Category from "./categories/categories";
import Swiper from "./swipper/swipper";
import Offer from "./offer/offer";

export default function App() {
  return (
    <ConfigProvider
      direction="rtl"
      theme={{
        token: {
          fontFamily: "Vazirmatn, tahoma",
        },
        components: {
          Card: {
            headerFontSize: 14,
          },
        },
      }}
    >
      <Navigation />
      <Carousel />
      <Category />
      <Swiper />
      <Offer />
    </ConfigProvider>
  );
}
