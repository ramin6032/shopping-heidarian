import { runQuery } from "../../../../lib/db";
export async function GET() {
  try {
    const response = await runQuery("SELECT * FROM product", []);

    const data = JSON.stringify(response);

    return data;
  } catch (error) {
    console.log(error);

    throw new Error("Failed to fetch revenue data.");
  }
}
