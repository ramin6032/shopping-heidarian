"use server";

import { query } from "./db/db";

//واکشی محصول
export const getProduct = async (id: string) => {
  try {
    const [product]: any = await query(
      `SELECT *,IF(offerStatus=1 and offerTime>now() ,1,0) as offerStatus  FROM product where ID=${id}`
    );
    return product;
  } catch (error) {
    console.log("in getProduct: " + error);
  }
};

//واکشی محصولات
export const getProducts = async (page: number) => {
  try {
    const from = page - 1 * 50;
    const to = page * 50;
    const [product]: any = await query(
      `SELECT *,IF(offerStatus=1 and offerTime>now() ,1,0) as offerStatus  FROM product where ID between ${from} and ${to}`
    );
    return product;
  } catch (error) {
    console.log("in getProduct: " + error);
  }
};

//اضافه کردن
