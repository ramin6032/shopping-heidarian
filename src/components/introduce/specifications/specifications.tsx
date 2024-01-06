import { Divider, Button } from "antd";
import CountDown from "src/components/countDown/countDown";
import { Plus, Minus, Heart, Shirt } from "src/lib/icons";
import "../style.css";

export default function Specifications() {
  return (
    <div className="specifications-container user-select-none">
      <h3 className="specifications-title">سارافون صورتی</h3>
      <p className="specifications-descrption">کد محصول: 1359</p>
      <circle className="d-flex flex-column gap-3">
        <div className="d-flex align-items-center gap-4 flex-wrap">
          <div className="specifications-price">
            250,000 <span className="specifications-currency">تومان</span>
          </div>
          <div className="specifications-price-line-through text-decoration-line-through  text-body-tertiary">
            290,000 تومان
          </div>
        </div>
        <CountDown />
      </circle>

      <Divider />
      <circle className="d-flex flex-column gap-3">
        <div className="specifications-caption">انتخاب سایز:</div>
        <div className="d-flex flex-wrap gap-3 specifications-size">
          <Button size="large" type="primary" shape="circle">
            35
          </Button>

          <Button size="large" type="primary" shape="circle">
            40
          </Button>

          <Button size="large" type="primary" shape="circle">
            45
          </Button>

          <Button size="large" type="primary" shape="circle">
            50
          </Button>

          <Button size="large" type="primary" shape="circle">
            55
          </Button>
        </div>
      </circle>

      <circle className="d-flex flex-column gap-3 mt-3">
        <div className="specifications-caption">انتخاب رنگ:</div>
        <div className="d-flex flex-wrap gap-3 specifications-colors">
          <Shirt
            style={{ color: "#e6ce9e", fontSize: "38px", cursor: "pointer" }}
          />
          <Shirt
            style={{ color: "#ffddd1", fontSize: "38px", cursor: "pointer" }}
          />
          <Shirt
            style={{ color: "#fdca21", fontSize: "38px", cursor: "pointer" }}
          />
          <Shirt
            style={{ color: "#c5b2b1", fontSize: "38px", cursor: "pointer" }}
          />
        </div>
      </circle>

      <circle className="mt-4 d-flex flex-column gap-3">
        <div className="d-flex gap-4">
          <Button
            size="large"
            block
            icon={<Heart style={{ fontSize: "18px" }} />}
          >
            اضافه به علاقه مندی ها
          </Button>
          <div className="specifications-amount">
            <Button type="text" icon={<Plus style={{ fontSize: "18px" }} />} />
            <span className="fs-4 fw-medium ">{1}</span>
            <Button type="text" icon={<Minus style={{ fontSize: "18px" }} />} />
          </div>
        </div>
        <Button
          type="primary"
          size="large"
          block
          className="specifications-addToCard"
        >
          اضافه به سبد
        </Button>
      </circle>
      <Divider />
      <div className="d-flex flex-wrap gap-2">
        <small style={{ color: "rgb(0,0,0,.40)" }}>دسته بندی:</small>
        <strong
          style={{
            color: "rgb(0,0,0,.88)",
            fontWeight: "300",
            fontSize: "14px",
          }}
        >
          زنانه، بچه گانه، دخترانه، پائیزی
        </strong>
      </div>
    </div>
  );
}
