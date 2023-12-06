"use client";
import { ConfigProvider } from "antd";
import Navigation from "./navigation/navigation";
import Carousel from "./carousel/carousel";
import Category from "./categories/categories";
import ProductsSlider from "./productsSlider/productsSlider";
import Offer from "./offer/offer";
import AmazingOffer from "./amazingOffer/amazingOffer";

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
      <ProductsSlider caption="محصولات جدید" />
      <AmazingOffer />
    </ConfigProvider>
  );
}
