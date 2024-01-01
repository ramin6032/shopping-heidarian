import React from "react";
import CountDown from "../countDown/countDown";
import Swip from "../swip/swip";
import { productCardSwipperBreakpoints } from "src/lib/consts";
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
          <Swip
            type="productCard"
            breakpoints={productCardSwipperBreakpoints}
            items={items}
            navigation
            pagination
          />
        </div>
      </div>
    </div>
  );
};
export default AmazingOffer;
