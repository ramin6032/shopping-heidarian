"use client";

import React, { useState, useEffect } from "react";
import { Card } from "antd";
import Icon from "@ant-design/icons";
import Image from "next/image";
import { bookmark, bookmarkFill } from "src/lib/icons";
import { productCard } from "src/lib/types";
import { FlipLeft } from "src/lib/animation";

const { Meta } = Card;

const ProductCard: React.FC<productCard> = ({
  src,
  title,
  description,
  price,
  prevPrice,
  label,
}) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [favIconClass, setFavIconClass] = useState("");

  const favoriteOnClick = () => {
    setIsFavorite(!isFavorite);
  };

  useEffect(() => {
    if (isFavorite) setFavIconClass("magictime puffIn");
    if (!isFavorite) {
      setFavIconClass("magictime puffOut");

      var favIconReaction = setTimeout(() => {
        setFavIconClass("");
      }, 400);
    }

    return () => {
      clearTimeout(favIconReaction);
    };
  }, [isFavorite]);

  return (
    <FlipLeft>
      <div className="pt-2 pb-4 product-card position-relative ">
        <Card
          hoverable
          cover={
            <Image
              alt="example"
              src={src}
              className="cover"
              width={250}
              height={250}
            />
          }
          className="hover-zoomIn "
        >
          <div className="position-relative ">
            <Meta
              title={title}
              style={{ height: 40 }}
              description={description}
            />
            <div className="productBookmark">
              <Icon
                component={isFavorite ? bookmarkFill : bookmark}
                onClick={favoriteOnClick}
                className={favIconClass}
              />
            </div>
          </div>

          <div className="d-flex flex-wrap justify-content-between align-items-end product-price">
            <span className="fw-medium fs-6 color-primary">{`${parseInt(
              price
            ).toLocaleString()} ریال`}</span>
            <span className="text-decoration-line-through text-black-50">
              {prevPrice ? `${parseInt(prevPrice).toLocaleString()} ریال` : ""}
            </span>
          </div>
        </Card>

        {label && <div className="productLabel">{label}</div>}
      </div>
    </FlipLeft>
  );
};

export default ProductCard;
