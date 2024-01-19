"use server";

import { query } from "./db/db";

export const getProduct = async (id: string) => {
  try {
    const [product]: any = await query(
      `SELECT *,IF(offerStatus=1 and offerTime>now() ,1,0) as offerStatuss  FROM product where ID=${id}`
    );
    return product;
  } catch (error) {
    console.log("in getProduct: " + error);
  }
};
