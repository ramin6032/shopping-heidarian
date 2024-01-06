import React, { useEffect } from "react";
import FlipCountdown from "@rumess/react-flip-countdown";

const CountDown: React.FC = () => {
  return (
    <div dir="ltr" className="text-end">
      <FlipCountdown
        className="d-inline"
        hideYear
        hideMonth
        hideDay
        hourTitle="ساعت"
        minuteTitle="دقیقه"
        secondTitle="ثانیه"
        size="small"
        endAt={new Date(
          Date.now() +
            1000 /* sec */ *
              60 /* min */ *
              60 /* hour */ *
              24 /* day */ *
              30 /* month */ *
              12 /* year */ *
              2
        ).toUTCString()} // Date/Time
      />
    </div>
  );
};

export default CountDown;
