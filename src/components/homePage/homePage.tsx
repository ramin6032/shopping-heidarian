"use client";
import React from "react";
import Navigation from "../navigation/navigation";
import Carousel from "../carousel/carousel";
import CategoryCard from "../CategoryCard/CategoryCard";
import Swip from "../swip/swip";
import AmazingOffer from "../amazingOffer/amazingOffer";
import { productCardSwipperBreakpoints } from "src/lib/consts";
import { useAppSelector } from "src/lib/redux/hooks";
import ProductCard from "src/components/productCard/productCard";

const HomePage: React.FC = () => {
  const products = useAppSelector((state) => state.products);
  const categoriesItems = products.categories.map((category, index) => (
    <CategoryCard
      src={category.src}
      caption={category.caption}
      type="square"
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
      <Swip
        type="categoryCard"
        breakpoints={productCardSwipperBreakpoints}
        items={categoriesItems}
      />
      <Swip
        caption="جدیدترین محصولات"
        breakpoints={productCardSwipperBreakpoints}
        items={newProductsItems}
        type="productCard"
        navigation
        pagination
      />
      <AmazingOffer items={amazingOfferProductsItems} />
      <Swip
        caption="پرفروش ترین محصولات"
        breakpoints={productCardSwipperBreakpoints}
        items={newProductsItems}
        type="productCard"
        navigation
        pagination
      />
      <Swip
        caption="پیشنهاد ما محصولات"
        breakpoints={productCardSwipperBreakpoints}
        items={newProductsItems}
        type="productCard"
        navigation
        pagination
      />
    </>
  );
};

export default HomePage;
