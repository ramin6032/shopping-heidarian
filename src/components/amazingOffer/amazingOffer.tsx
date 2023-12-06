import AmazingOfferSlider from "./amazingOfferSlider/amazingOfferSlider";
import CountDown from "../countDown/countDown";

const AmazingOffer = () => {
  return (
    <div className="row amaizingOfferContainer py-2 px-3">
      <div className="col-12 col-md-6 col-lg-12 col-xl-12">
        <h5 className="text-center mt-3 header">پیشنهاد شگفت انگیز</h5>
        <div>
          <CountDown />
        </div>
      </div>
      <div className="col-12 col-md-6 col-lg-12 col-xl-12 ">
        <AmazingOfferSlider />
      </div>

      {/* <div className="amaizingOfferContainer">
        <div className="amaizingOfferCountDownContainer">
          
        </div>
        <div className="amaizingOfferSliderContainer"></div>
      </div> */}
    </div>
  );
};
export default AmazingOffer;
