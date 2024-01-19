import { Divider, Button } from "antd";
import CountDown from "src/components/countDown/countDown";
import { Plus, Minus, Heart, Shirt } from "src/lib/icons";
import "../style.css";
import { useEffect, useState } from "react";

export default function Specifications({ product }: { product: any }) {
  const [price, setprice] = useState<number | string | undefined>(); // قابل پرداخت
  const [realPrice, setRealPrice] = useState<number | string | undefined>(
    product.price
  ); //قیمت قبل از تخفیف
  const [size, setSize] = useState<string | undefined>();
  const [selectedColor, setSelectedColor] = useState<string | undefined>();
  const [amount, setAmount] = useState<number>(1);

  useEffect(() => {
    if (product.offerStatus) {
      setprice((product.price * (100 - product.offerDiscount)) / 100);
    } else if (product.discount) {
      setprice((product.price * (100 - product.discount)) / 100);
    } else {
      setprice(product.price);
    }
  }, [product]);

  useEffect(() => {
    if (size) {
      const [{ price }] = product.size.filter(
        (item: any) => item.size === size
      );
      setRealPrice(price);
      if (product.offerStatus) {
        setprice((price * (100 - product.offerDiscount)) / 100);
      } else if (product.discount) {
        setprice((price * (100 - product.discount)) / 100);
      } else {
        setprice(price);
      }
    }
  }, [size, product]);

  const showSize = () => {
    return product.size.map((item: any, index: number) => (
      <Button
        key={index}
        size="large"
        type="primary"
        shape="round"
        onClick={() => setSize(item.size)}
        className={item.size === size ? "activeSize" : ""}
      >
        {item.size}
      </Button>
    ));
  };

  const showColors = () => {
    return product.color.map(
      (color: { code: string; label: string }, index: number) => (
        <div className="d-flex flex-column align-items-center" key={index}>
          <Shirt
            style={{
              color: color.code,
              fontSize: "38px",
              cursor: "pointer",
            }}
            onClick={() => setSelectedColor(color.code)}
            className={selectedColor === color.code ? "activeColor" : ""}
          />
          <small>{selectedColor === color.code ? color.label : ""}</small>
        </div>
      )
    );
  };

  return (
    <div className="specifications-container user-select-none">
      <h3 className="specifications-title">{product.name}</h3>
      <p className="specifications-descrption">{`کد محصول: ${product.ID}`}</p>
      <section className="d-flex flex-column gap-3">
        <div className="d-flex align-items-center gap-4 flex-wrap">
          <div className="specifications-price">
            {parseInt(price).toLocaleString()}{" "}
            <span className="specifications-currency">تومان</span>
          </div>
          <div className="specifications-price-line-through text-decoration-line-through  text-body-tertiary">
            {parseInt(realPrice).toLocaleString()} تومان
          </div>
        </div>
        {product.offerStatus ? <CountDown /> : null}
      </section>

      <Divider />
      <section className="d-flex flex-column gap-3">
        <div className="specifications-caption">انتخاب سایز:</div>
        <div className="d-flex flex-wrap gap-3 specifications-size">
          {showSize()}
        </div>
      </section>

      <section className="d-flex flex-column gap-3 mt-3">
        <div className="specifications-caption">انتخاب رنگ:</div>
        <div className="d-flex flex-wrap gap-3 specifications-colors">
          {showColors()}
        </div>
      </section>

      <section className="mt-4 d-flex flex-column gap-3">
        <div className="d-flex gap-4">
          <Button
            size="large"
            block
            icon={<Heart style={{ fontSize: "18px" }} />}
          >
            اضافه به علاقه مندی ها
          </Button>
          <div className="specifications-amount">
            <Button
              type="text"
              icon={<Plus style={{ fontSize: "18px" }} />}
              onClick={() =>
                amount + 1 > product.amount
                  ? setAmount(amount)
                  : setAmount(amount + 1)
              }
            />
            <span className="fs-4 fw-medium ">{amount}</span>
            <Button
              type="text"
              icon={<Minus style={{ fontSize: "18px" }} />}
              onClick={() =>
                amount - 1 ? setAmount(amount - 1) : setAmount(1)
              }
            />
          </div>
        </div>
        <Button
          type="primary"
          size="large"
          block
          className="specifications-addToCard"
          disabled={product.amount === 0}
        >
          {product.amount === 0 ? "اتمام موجودی" : "اضافه به سبد"}
        </Button>
      </section>
    </div>
  );
}
