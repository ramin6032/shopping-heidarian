import { Splide, SplideSlide } from "@splidejs/react-splide";
import Image from "next/image";
import { FadeUp } from "src/lib/animation";
import "@splidejs/react-splide/css";
import slider1 from "src/assets/images/sliders/pic.webp";
import slider2 from "src/assets/images/sliders/slider2.jpg";
import slider3 from "src/assets/images/sliders/slider3.jpg";
import slider4 from "src/assets/images/sliders/slider4.jpg";
import { useEffect, useState } from "react";

export default function Slider() {
  const mainOptions = {
    autoplay: true,
    interval: 6000,
    type: "fade",
    pauseOnHover: false,
    rewind: true,
  };

  return (
    <div className="w-100 slider" dir="ltr">
      <Splide options={mainOptions}>
        <SplideSlide>
          <div className="slide bg-gray d-flex justify-content-center ">
            <FadeUp>
              <Image
                src={slider1}
                alt="1"
                className="position-absolute bottom-0 end-50"
                style={{ height: "75%", width: "auto" }}
              />
            </FadeUp>
          </div>
        </SplideSlide>
        <SplideSlide>
          <div className="slide bg-3 d-flex justify-content-center">
            <FadeUp>
              <Image
                src={slider1}
                alt="1"
                className="position-absolute bottom-0 end-50"
                style={{ height: "75%", width: "auto" }}
              />
            </FadeUp>
          </div>
        </SplideSlide>
        <SplideSlide>
          <div className="slide bg-4"></div>
        </SplideSlide>
      </Splide>
    </div>
  );
}
