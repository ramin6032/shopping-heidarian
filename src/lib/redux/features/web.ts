import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { menu } from "src/lib/types";

export interface initialState {
  menu: menu[];
}

// Define the initial state using that type
const initialState: initialState = {
  menu: [
    {
      label: "بهاره",
      href: "/spring",
      category: "spring",
      key: "spring",
      hover: true,
      icon: "",
      tabs: [
        { label: "پسرانه", key: "boys" },
        { label: "دخترانه", key: "girls" },
      ],
      submenu: [
        {
          label: "تیشرت شلوارک",
          category: "",
          key: "",
          href: "CottonPants",
          image: "",
          tabKey: "boys",
        },
        {
          label: "تیشرت شلوارک کارگور",
          category: "",
          key: "",
          href: "CottonPants",
          image: "",
          tabKey: "boys",
        },
        {
          label: "بلوز شلوار",
          category: "",
          key: "",
          href: "CottonPants",
          image: "",
          tabKey: "boys",
        },
        {
          label: "شلوار فاستونی",
          category: "",
          key: "",
          href: "CottonPants",
          image: "",
          tabKey: "boys",
        },
        {
          label: "شلوار جین مام استایل",
          category: "",
          key: "",
          href: "CottonPants",
          tabKey: "boys",
        },
        {
          label: "شلوار اسلش",
          category: "",
          key: "",
          href: "CottonPants",
          tabKey: "boys",
        },
        {
          label: "شلوار کارگور",
          category: "",
          key: "",
          href: "CottonPants",
          tabKey: "boys",
        },
        {
          label: "بلوز تک ",
          category: "",
          key: "",
          href: "CottonPants",
          tabKey: "boys",
        },
        {
          label: "شلوار جین راحتی",
          category: "",
          key: "",
          href: "CottonPants",
          tabKey: "boys",
        },
      ],
    },
    {
      label: "تابستانه",
      href: "/summer",
      key: "summer",
      tabs: [
        {
          label: "پسرانه",
          submenu: [
            {
              label: "تیشرت شلوارک",
              category: "",
              key: "",
              href: "CottonPants",
              image: "",
            },
            {
              label: "تیشرت شلوارک کارگور",
              category: "",
              key: "",
              href: "CottonPants",
              image: "",
            },
            {
              label: "بلوز شلوار",
              category: "",
              key: "",
              href: "CottonPants",
              image: "",
            },
            {
              label: "شلوار فاستونی",
              category: "",
              key: "",
              href: "CottonPants",
              image: "",
            },
            {
              label: "شلوار جین مام استایل",
              category: "",
              key: "",
              href: "CottonPants",
            },
            {
              label: "شلوار اسلش",
              category: "",
              key: "",
              href: "CottonPants",
            },
            {
              label: "شلوار کارگور",
              category: "",
              key: "",
              href: "CottonPants",
            },
            {
              label: "بلوز تک ",
              category: "",
              key: "",
              href: "CottonPants",
            },
            {
              label: "شلوار جین راحتی",
              category: "",
              key: "",
              href: "CottonPants",
            },
          ],
        },
        {
          label: "دخترانه",
          submenu: [
            {
              label: "بلوز شلوار",
              category: "",
              key: "",
              href: "CottonPants",
            },
            {
              label: "شلوار فاستونی",
              category: "",
              key: "",
              href: "CottonPants",
            },
            {
              label: "شلوار جین مام استایل",
              category: "",
              key: "",
              href: "CottonPants",
            },
            {
              label: "شلوار اسلش",
              category: "",
              key: "",
              href: "CottonPants",
            },

            {
              label: "شلوار کارگور",
              category: "",
              key: "",
              href: "CottonPants",
            },
            {
              label: "بلوز تک",
              href: "CottonPants",
              category: "",
              key: "",
            },
            {
              label: "بلوز تک",
              href: "CottonPants",
              category: "",
              key: "",
            },
            {
              label: "شلوار جین راحتی",
              href: "CottonPants",
              category: "",
              key: "",
            },
            {
              label: "کراپ ",
              href: "CottonPants",
              category: "",
              key: "",
            },
            {
              label: "مانتو",
              href: "CottonPants",
              category: "",
              key: "",
            },
          ],
        },
      ],
    },
  ],
};

export const web = createSlice({
  name: "web",
  initialState,
  reducers: {},
});

// Action creators are generated for each case reducer function
export const {} = web.actions;

export default web.reducer;
