import AOS from "aos";
import "aos/dist/aos.css";

export const FadeUp = ({ children, delay = 50 }) => {
  AOS.init();
  return (
    <div
      data-aos="fade-up"
      data-aos-offset="1"
      data-aos-delay={delay}
      data-aos-duration="1000"
      data-aos-easing="ease-in-out"
      data-aos-mirror="true"
      data-aos-once="false"
      data-aos-anchor-placement="top-center"
    >
      {children}
    </div>
  );
};

export const FadeDown = ({ children }) => (
  <div
    data-aos="fade-down"
    data-aos-offset="1"
    data-aos-delay="50"
    data-aos-duration="1000"
    data-aos-easing="ease-in-out"
    data-aos-mirror="true"
    data-aos-once="false"
    data-aos-anchor-placement="bottom-center"
  >
    {children}
  </div>
);

export const ZoomInUp = ({ children, delay = 50 }) => {
  AOS.init();
  return (
    <div
      data-aos="zoom-in"
      data-aos-offset="1"
      data-aos-delay={delay}
      data-aos-duration="1000"
      data-aos-easing="ease-in-out"
      data-aos-mirror="true"
      data-aos-once="false"
      data-aos-anchor-placement="top-center"
    >
      {children}
    </div>
  );
};

export const FlipLeft = ({ children, delay = 50 }) => {
  AOS.init();
  return (
    <div
      data-aos="flip-left"
      data-aos-offset="1"
      data-aos-delay={delay}
      data-aos-duration="1000"
      data-aos-easing="ease-in-out"
      data-aos-mirror="true"
      data-aos-once="false"
      data-aos-anchor-placement="top-center"
    >
      {children}
    </div>
  );
};
