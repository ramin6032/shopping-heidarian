import React from "react";
import { Divider } from "antd";
import { Swiper, SwiperSlide } from "swiper/react";
import type { swip } from "src/lib/types";
import {
  Navigation,
  Pagination,
  A11y,
  Autoplay,
  FreeMode,
} from "swiper/modules";

import "swiper/css/navigation";
import "swiper/css/pagination";

const Swip: React.FC<swip> = ({
  caption,
  breakpoints,
  navigation = false,
  pagination = false,
  autoplay = false,
  spaceBetween = 30,
  slidesPerView = "auto",
  items = [],
  type = "productCard",
}) => {
  return (
    <div className="pt-3">
      {caption && (
        <Divider orientation="left" style={{ fontSize: "18px" }}>
          {caption}
        </Divider>
      )}
      <div className={`px-3 ${type}`}>
        <Swiper
          modules={[Navigation, Pagination, A11y, FreeMode, Autoplay]}
          spaceBetween={spaceBetween}
          slidesPerView={slidesPerView}
          autoplay={autoplay ? { pauseOnMouseEnter: true } : false}
          navigation={navigation}
          freeMode={true}
          pagination={pagination && { dynamicBullets: true }}
          breakpoints={breakpoints}
        >
          {items.map((item, index) => (
            <SwiperSlide key={index}>{item}</SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};
export default Swip;
