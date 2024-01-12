import React from "react";
import { Divider } from "antd";
import type { swip } from "src/lib/types";
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";

const Swip: React.FC<swip> = ({
  caption,
  items = [],
  widthElement,
  gap = 16,
}) => {
  interface makeBreakpointsProps {
    widthElement: number;
    gap: number;
  }
  const makeBreakpoints = ({ widthElement, gap }: makeBreakpointsProps) => {
    return {
      [widthElement * 2 + gap + 20]: {
        perPage: 1,
        width: widthElement + 20,
      },
      [widthElement * 3 + gap * 2 + 20]: {
        perPage: 2,
        width: widthElement * 2 + gap + 20,
      },
      [widthElement * 4 + gap * 3 + 20]: {
        perPage: 3,
        width: widthElement * 3 + gap * 2 + 20,
      },
      [widthElement * 5 + gap * 4 + 20]: {
        perPage: 4,
        width: widthElement * 4 + gap * 3 + 20,
      },
      [widthElement * 6 + gap * 5 + 20]: {
        perPage: 5,
        width: widthElement * 5 + gap * 4 + 20,
      },
      [widthElement * 7 + gap * 6 + 20]: {
        perPage: 6,
        width: widthElement * 6 + gap * 5 + 20,
      },
    };
  };

  return (
    <section className="pt-3 categories">
      {caption && (
        <Divider orientation="left" style={{ fontSize: "18px" }}>
          {caption}
        </Divider>
      )}
      <div className="d-flex justify-content-center">
        <Splide
          hasTrack={false}
          options={{
            direction: "rtl",
            pagination: false,
            lazyLoad: "sequential",
            rewind: true,
            gap: gap,
            perPage: 7,
            width: "1285px",
            breakpoints: makeBreakpoints({ widthElement, gap }),
            perMove: 1,
          }}
        >
          <SplideTrack>
            {items.map((item, index) => (
              <SplideSlide key={index}>{item}</SplideSlide>
            ))}
          </SplideTrack>
        </Splide>
      </div>
    </section>
  );
};
export default Swip;
