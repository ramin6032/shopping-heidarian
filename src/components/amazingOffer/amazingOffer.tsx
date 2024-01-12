import React from "react";
import CountDown from "../countDown/countDown";
import Swip from "../swip/swip";
import { amazingOffer } from "src/lib/types";

const AmazingOffer: React.FC<amazingOffer> = ({ items }) => {
  return (
    <div className="amaizingOfferContainer">
      <div className="amazigOfferShockShopping d-none d-xl-block"></div>

      <div className="row amazingOfferBorder py-2 gy-2">
        <div className="col-12 col-xl-4">
          <div className="d-flex flex-column justify-content-center align-items-center">
            <div className="amazigOfferCaption"></div>
            <CountDown />
          </div>
        </div>
        <div className="col-xl-8 col-12">
          <Swip widthElement={330} items={items} />
        </div>
      </div>
    </div>
  );
};
export default AmazingOffer;
