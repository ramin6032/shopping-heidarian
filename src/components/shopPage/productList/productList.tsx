"use client";
import React, { useState } from "react";
import { List } from "antd";
import ProductCard from "src/components/productCard/productCard";
import type { productCard } from "src/lib/types";
import SortBy from "../sort/sort";

const ProductList: React.FC<{ data: productCard[] }> = ({ data }) => {
  const [productList, setProductList] = useState(data);
  return (
    <>
      <SortBy />
      <List
        grid={{
          gutter: 16,
          xs: 1,
          sm: 2,
          md: 3,
          lg: 4,
          xl: 4,
          xxl: 5,
        }}
        dataSource={productList}
        renderItem={(product, index) => (
          <List.Item>
            <ProductCard
              key={index}
              src={product.src}
              title={product.title}
              price={product.price}
              prevPrice={product.prevPrice}
              label={product.label}
            />
          </List.Item>
        )}
      />
    </>
  );
};

export default ProductList;
