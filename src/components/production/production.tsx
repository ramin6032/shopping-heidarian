import React from "react";
import { Card } from "antd";
import Icon from "@ant-design/icons";
import Image from "next/image";
import type { StaticImageData } from "next/image";
import { bookmark } from "src/assets/svg/icons";

const { Meta } = Card;

type props = {
  src: StaticImageData;
  title: string;
  description?: string;
  price: string;
  prevPrice?: string;
  label?: string;
};

const Production: React.FC<props> = ({
  src,
  title,
  description,
  price,
  prevPrice,
  label,
}) => (
  <div className="py-3 px-2 position-relative">
    <Card hoverable cover={<Image alt="example" src={src} className="cover" />}>
      <div className="position-relative">
        <Meta title={title} description={description} style={{ height: 90 }} />
        <div className="favorit">
          <Icon component={bookmark} />
        </div>
      </div>

      <div className="d-flex justify-content-between">
        <span className="fw-medium fs-6 color-primary">{`${parseInt(
          price
        ).toLocaleString()} ریال`}</span>
        <span className="text-decoration-line-through text-black-50">
          {prevPrice ? `${parseInt(prevPrice).toLocaleString()} ریال` : ""}
        </span>
      </div>
    </Card>

    {label && <div className="label">{label}</div>}
  </div>
);

export default Production;
