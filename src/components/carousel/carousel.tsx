import React from "react";
import { Carousel as AntCarousel } from "antd";

const contentStyle: React.CSSProperties = {
  margin: 0,
  height: "calc(100vh - 100px)",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
};

const Carousel: React.FC = () => {
  const onChange = (currentSlide: number) => {
    // console.log(currentSlide);
  };

  return (
    <AntCarousel afterChange={onChange} dotPosition="right" autoplay>
      <div>
        <h3 style={contentStyle}>1</h3>
      </div>
      <div>
        <h3 style={contentStyle}>2</h3>
      </div>
      <div>
        <h3 style={contentStyle}>3</h3>
      </div>
      <div>
        <h3 style={contentStyle}>4</h3>
      </div>
    </AntCarousel>
  );
};

export default Carousel;
