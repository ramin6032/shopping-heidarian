import { createRef, useEffect } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import Image from "next/image";
import "@splidejs/react-splide/css";

export default function ThumbnailSlider() {
  const mainRef = createRef<Splide>();
  const thumbsRef = createRef<Splide>();
  useEffect(() => {
    if (mainRef.current && thumbsRef.current && thumbsRef.current.splide) {
      mainRef.current.sync(thumbsRef.current.splide);
    }
  }, []);
  const thumbnailOptions = {
    fixedWidth: 100,
    gap: 10,
    direction: "rtl",
    pagination: false,
    lazyLoad: "sequential",
    rewind: true,
    perPage: 4,
    width: "400px",
    perMove: 1,
    isNavigation: true,
  };

  const mainOptions = {
    direction: "rtl",
    arrows: false,
    pagination: false,
    lazyLoad: "sequential",
    rewind: true,
    gap: 16,
    perPage: 1,
    width: "400px",
    perMove: 1,
  };

  return (
    <div>
      <div id="main-slider">
        <Splide ref={mainRef} options={mainOptions}>
          <SplideSlide>
            <Image
              src="/images/pic1.jpg"
              alt="Thumbnail 3"
              height={400}
              width={400}
            />
          </SplideSlide>
          <SplideSlide>
            <Image
              src="/images/pic5.jpg"
              alt="Thumbnail 3"
              width={400}
              height={400}
            />
          </SplideSlide>
          <SplideSlide>
            <Image
              src="/images/pic6.jpg"
              alt="Thumbnail 3"
              width={400}
              height={400}
            />
          </SplideSlide>
          <SplideSlide>
            <Image
              src="/images/pic7.jpg"
              alt="Thumbnail 3"
              width={400}
              height={400}
            />
          </SplideSlide>
        </Splide>
      </div>
      <div id="thumbnail-slider" className="mt-2">
        <Splide ref={thumbsRef} options={thumbnailOptions}>
          <SplideSlide>
            <Image
              src="/images/pic1.jpg"
              alt="Thumbnail 1"
              width={100}
              height={100}
            />
          </SplideSlide>
          <SplideSlide>
            <Image
              src="/images/pic5.jpg"
              alt="Thumbnail 2"
              width={100}
              height={100}
            />
          </SplideSlide>
          <SplideSlide>
            <Image
              src="/images/pic6.jpg"
              alt="Thumbnail 3"
              width={100}
              height={100}
            />
          </SplideSlide>
          <SplideSlide>
            <Image
              src="/images/pic7.jpg"
              alt="Thumbnail 3"
              width={100}
              height={100}
            />
          </SplideSlide>
        </Splide>
      </div>
    </div>
  );
}
