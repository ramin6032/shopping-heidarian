import type { StaticImageData } from "next/image";

export type productProps = {
  src: StaticImageData;
  title: string;
  description?: string;
  price: string;
  prevPrice?: string;
  label?: string;
};

export type ProductsSliderProps = {
  caption?: string;
};
