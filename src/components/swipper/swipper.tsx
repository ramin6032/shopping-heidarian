import React from "react";
import { Divider } from "antd";
import Production from "src/components/production/production";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  A11y,
  Autoplay,
  FreeMode,
} from "swiper/modules";
import "swiper/css/navigation";
import "swiper/css/pagination";

import pic4 from "src/assets/images/pic4.jpg";
import pic5 from "src/assets/images/pic5.jpg";
import pic6 from "src/assets/images/pic6.jpg";
import pic7 from "src/assets/images/pic7.jpg";

const Swip = ({ itemList = [], caption = "" }) => {
  return (
    <>
      <Divider orientation="left">جدیدترین محصولات</Divider>
      <div className="px-3">
        <Swiper
          modules={[Navigation, Pagination, A11y, Autoplay, FreeMode]}
          spaceBetween={5}
          slidesPerView={5}
          autoplay
          navigation
          freeMode={true}
          pagination={{ dynamicBullets: true }}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 4,
              spaceBetween: 40,
            },
            1024: {
              slidesPerView: 5,
              spaceBetween: 50,
            },
          }}
        >
          <SwiperSlide>
            <Production
              src={pic4}
              title="سیسمونی تیکه باز نوزادی"
              description="کد 1402"
              price="1450000"
              prevPrice="2550000"
              label="تخفیف"
            />
          </SwiperSlide>
          <SwiperSlide>
            <Production
              src={pic5}
              title="سیسمونی تیکه باز نوزادی Dog قواره دار H.S"
              description="کد 1458"
              price="1450000"
              label="جدید"
            />
          </SwiperSlide>
          <SwiperSlide>
            <Production
              src={pic6}
              title="سیسمونی تیکه باز نوزادی رافائل P.S"
              description="کد 12458"
              price="1450000"
              prevPrice="2550000"
            />
          </SwiperSlide>
          <SwiperSlide>
            <Production
              src={pic7}
              title="سیسمونی تیکه باز نوزادی Dog قواره دار H.S"
              description="کد 1458"
              price="1450000"
              label="تخفیف"
            />
          </SwiperSlide>
          <SwiperSlide>
            <Production
              src={pic4}
              title="سیسمونی تیکه باز نوزادی Dog قواره دار H.S"
              description="کد 1458"
              price="1450000"
              prevPrice="2550000"
            />
          </SwiperSlide>
          <SwiperSlide>
            <Production
              src={pic5}
              title="سیسمونی تیکه باز نوزادی Dog قواره دار H.S"
              description="کد 1458"
              price="1450000"
              prevPrice="2550000"
              label="تخفیف"
            />
          </SwiperSlide>
          <SwiperSlide>
            <Production
              src={pic6}
              title="سیسمونی تیکه باز نوزادی رافائل P.S"
              description="کد 12458"
              price="1450000"
              prevPrice="2550000"
              label="جدید"
            />
          </SwiperSlide>
          <SwiperSlide>
            <Production
              src={pic7}
              title="سیسمونی تیکه باز نوزادی رافائل P.S"
              description="کد 12458"
              price="1450000"
              prevPrice="2550000"
            />
          </SwiperSlide>
        </Swiper>
      </div>
    </>
  );
};
export default Swip;
