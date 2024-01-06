"use client";

import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

// import required modules
import { FreeMode, Navigation, Thumbs } from "swiper/modules";

import "../style.css";

export default function ThumbsGallery() {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  return (
    <div>
      <Swiper
        spaceBetween={10}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Thumbs]}
        className="thumbGallery-selectedImage"
      >
        <SwiperSlide>
          <img src="/images/pic1.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/images/pic5.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/images/pic6.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/images/pic7.jpg" />
        </SwiperSlide>
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mt-2 thumbGallery-smallImages"
      >
        <SwiperSlide>
          <img src="/images/pic4.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/images/pic5.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/images/pic6.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/images/pic7.jpg" />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
