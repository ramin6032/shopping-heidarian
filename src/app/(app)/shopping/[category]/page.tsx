import ProductList from "src/components/shopPage/productList/productList";
import { productList } from "src/lib/consts";

export default async function ShopPage_ssr() {
  return (
    <div className="container-xl">
      <ProductList data={productList} />
    </div>
  );
}
