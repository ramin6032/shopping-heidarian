import { runQuery } from "../../../server/db/db";
async function getProducts() {
  try {
    const response = await runQuery("SELECT * FROM product", []);

    const data = JSON.stringify(response);

    return data;
  } catch (error) {
    console.log(error);
  }
}

export default async function product(second) {
  const test = await getProducts();
  console.log("test", test);
  return <p>test</p>;
}
