import React, { useState, useEffect } from "react";
import { Card } from "antd";
import Icon from "@ant-design/icons";
import Image from "next/image";
import { bookmark, bookmarkFill } from "src/assets/svg/icons";
import { productProps } from "src/lib/types";

const { Meta } = Card;

const Production: React.FC<productProps> = ({
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
    <div className="pt-2 pb-4 px-2 position-relative">
      <Card
        hoverable
        cover={<Image alt="example" src={src} className="cover" />}
        className="hover-zoomIn"
      >
        <div className="position-relative">
          <Meta
            title={title}
            description={description}
            style={{ height: 90 }}
          />
          <div className="productBookmark-">
            <Icon
              component={isFavorite ? bookmarkFill : bookmark}
              onClick={favoriteOnClick}
              className={favIconClass}
            />
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

      {label && <div className="productLabel">{label}</div>}
    </div>
  );
};

export default Production;
