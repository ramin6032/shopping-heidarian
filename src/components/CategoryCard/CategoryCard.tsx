import React from "react";
import Image from "next/image";
import type { categoryCard } from "src/lib/types";
import { categoryCardOptions } from "src/lib/consts";

const CategoryCard: React.FC<categoryCard> = ({ src, caption, type }) => {
  return (
    <div className="coverContainer rounded">
      <Image
        src={src}
        alt="pic"
        className="cover"
        width={categoryCardOptions.width}
        height={categoryCardOptions.height}
      />
      <p className="subtitle">{caption}</p>
    </div>
  );
};

export default CategoryCard;
