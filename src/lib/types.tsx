import React from "react";
import type { SwiperOptions, NavigationOptions } from "swiper/types";

export interface productCard {
  src: string;
  title: string;
  description?: string;
  price: string;
  prevPrice: string;
  label: string;
}

export interface categoryCard {
  src: string;
  caption: string;
  type: "square" | "circle";
}

export interface amazingOffer {
  items: React.ReactNode[];
}

export interface swip {
  caption?: string;
  items: React.ReactNode[];
  widthElement: number;
  gap?: number;
}

export interface menu {
  label: string;
  key: string;
  hover?: boolean;
  icon?: string | React.ReactNode;
  category?: string;
  href?: string;
  tabs?: tabOfMenu[];
  submenu?: submenu[];
}

export interface submenu {
  label: string;
  category: string;
  key: string;
  image?: string;
  icon?: string | React.ReactNode;
  tabKey?: string;
}

export interface tabOfMenu {
  label: string;
  key: submenu[];
}
