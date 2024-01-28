import Categories from "src/components/dashboard/category/category";
import {
  getCategories,
  getRowsNumber,
} from "src/server/actions/categoryActions";

export default async function ManageCategories() {
  const categories = await getCategories();
  const rowsNumber = await getRowsNumber();

  if (categories.status === 500) return <p>خطایی پیش آمده</p>;

  return (
    <Categories
      categories={categories.response}
      rowsNumber={rowsNumber.rowsNumber}
    />
  );
}
