import React from "react";
import Image from "next/image";
import type { categoryCard } from "src/lib/types";
import { ZoomInUp } from "src/lib/animation";

const CategoryCard: React.FC<categoryCard> = ({ src, caption, type }) => {
  if (type === "circle")
    return (
      <ZoomInUp>
        <figure className="figure ">
          <Image
            src={src}
            alt="pic"
            className="cover rounded-circle d-block m-auto"
            width={167}
            height={167}
          />
          <figcaption className="figure-caption text-center py-2 fw-medium">
            {caption}
          </figcaption>
        </figure>
      </ZoomInUp>
    );

  return (
    <div className="coverContainer rounded">
      <Image src={src} alt="pic" className="cover" width={210} height={300} />
      <p className="subtitle">{caption}</p>
    </div>
  );
};

export default CategoryCard;
