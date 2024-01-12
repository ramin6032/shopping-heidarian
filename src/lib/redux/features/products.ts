import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { productCard, categoryCard } from "src/lib/types";

export interface initialState {
  newProducts: productCard[];
  bestSellingProducts: productCard[];
  amazingOfferProducts: productCard[];
  saleProducts: productCard[];
  bookmarkProducts: productCard[];
  categories: categoryCard[];
}

// Define the initial state using that type
const initialState: initialState = {
  newProducts: [
    {
      src: "/images/pic4.jpg",
      title: "سیسمونی تیکه باز نوزادی",
      description: "کد 1402",
      price: "1450000",
      prevPrice: "2550000",
      label: "تخفیف",
    },
    {
      src: "/images/pic5.jpg",
      title: "سیسمونی تیکه باز نوزادی",
      description: "کد 1402",
      price: "1450000",
      prevPrice: "2550000",
      label: "تخفیف",
    },
    {
      src: "/images/pic6.jpg",
      title: "سیسمونی تیکه باز نوزادی",
      description: "کد 1402",
      price: "1450000",
      prevPrice: "2550000",
      label: "تخفیف",
    },
    {
      src: "/images/pic7.jpg",
      title: "سیسمونی تیکه باز نوزادی",
      description: "کد 1402",
      price: "1450000",
      prevPrice: "2550000",
      label: "تخفیف",
    },
    {
      src: "/images/pic4.jpg",
      title: "سیسمونی تیکه باز نوزادی",
      description: "کد 1402",
      price: "1450000",
      prevPrice: "2550000",
      label: "تخفیف",
    },
    {
      src: "/images/pic5.jpg",
      title: "سیسمونی تیکه باز نوزادی",
      description: "کد 1402",
      price: "1450000",
      prevPrice: "2550000",
      label: "تخفیف",
    },
  ],
  bestSellingProducts: [],
  amazingOfferProducts: [
    {
      src: "/images/pic4.jpg",
      title: "سیسمونی تیکه باز نوزادی",
      description: "کد 1402",
      price: "1450000",
      prevPrice: "2550000",
      label: "تخفیف",
    },
    {
      src: "/images/pic5.jpg",
      title: "سیسمونی تیکه باز نوزادی",
      description: "کد 1402",
      price: "1450000",
      prevPrice: "2550000",
      label: "تخفیف",
    },
    {
      src: "/images/pic6.jpg",
      title: "سیسمونی تیکه باز نوزادی",
      description: "کد 1402",
      price: "1450000",
      prevPrice: "2550000",
      label: "تخفیف",
    },
    {
      src: "/images/pic7.jpg",
      title: "سیسمونی تیکه باز نوزادی",
      description: "کد 1402",
      price: "1450000",
      prevPrice: "2550000",
      label: "تخفیف",
    },
  ],
  saleProducts: [],
  bookmarkProducts: [],
  categories: [
    {
      src: "/images/categories/pic1.jpg",
      caption: "تابستانه",
      type: "square",
    },
    {
      src: "/images/categories/pic2.jpg",
      caption: "زمستانه",
      type: "square",
    },
    {
      src: "/images/categories/pic3.jpg",
      caption: "بهاره",
      type: "square",
    },
    {
      src: "/images/categories/pic1.jpg",
      caption: "عیدانه",
      type: "square",
    },
    {
      src: "/images/categories/pic2.jpg",
      caption: "مجلسی",
      type: "square",
    },
    {
      src: "/images/categories/pic3.jpg",
      caption: "با تخفیف",
      type: "square",
    },
    {
      src: "/images/categories/pic1.jpg",
      caption: "تابستانه",
      type: "square",
    },
    {
      src: "/images/categories/pic2.jpg",
      caption: "زمستانه",
      type: "square",
    },
    {
      src: "/images/categories/pic3.jpg",
      caption: "بهاره",
      type: "square",
    },
    {
      src: "/images/categories/pic1.jpg",
      caption: "عیدانه",
      type: "square",
    },
    {
      src: "/images/categories/pic2.jpg",
      caption: "مجلسی",
      type: "square",
    },
    {
      src: "/images/categories/pic3.jpg",
      caption: "با تخفیف",
      type: "square",
    },
  ],
};

export const userInfo = createSlice({
  name: "userInfo",
  initialState,
  reducers: {},
});

// Action creators are generated for each case reducer function
export const {} = userInfo.actions;

export default userInfo.reducer;
