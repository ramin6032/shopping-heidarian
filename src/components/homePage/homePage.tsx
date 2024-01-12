"use client";
import React from "react";
import Navigation from "../navigation/navigation";
import Carousel from "../carousel/carousel";
import CategoryCard from "../CategoryCard/CategoryCard";
import Swip from "../swip/swip";
import AmazingOffer from "../amazingOffer/amazingOffer";

import { useAppSelector } from "src/lib/redux/hooks";
import ProductCard from "src/components/productCard/productCard";

const HomePage: React.FC = () => {
  const products = useAppSelector((state) => state.products);
  const categoriesItems = products.categories.map((category, index) => (
    <CategoryCard
      src={category.src}
      caption={category.caption}
      type="circle"
      key={index}
    />
  ));
  const newProductsItems = products.newProducts.map((product, index) => (
    <ProductCard
      key={index}
      src={product.src}
      title={product.title}
      price={product.price}
      prevPrice={product.prevPrice}
      label={product.label}
    />
  ));
  const amazingOfferProductsItems = products.newProducts.map(
    (product, index) => (
      <ProductCard
        key={index}
        src={product.src}
        title={product.title}
        price={product.price}
        prevPrice={product.prevPrice}
        label={product.label}
      />
    )
  );
  return (
    <>
      <Navigation />
      <Carousel />
      <div className="container-xxl">
        <Swip widthElement={167} items={categoriesItems} />
        <Swip
          caption="جدیدترین محصولات"
          widthElement={250}
          items={newProductsItems}
        />
        <AmazingOffer items={amazingOfferProductsItems} />
        <Swip
          caption="پرفروش ترین محصولات"
          widthElement={250}
          items={newProductsItems}
        />
        <Swip
          caption="پیشنهاد ما محصولات"
          widthElement={250}
          items={newProductsItems}
        />
      </div>
    </>
  );
};

export default HomePage;
