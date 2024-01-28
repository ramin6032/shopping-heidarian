import clientPromise from "../../../lib/mongodb";
const ObjectId = require("mongodb").ObjectId;

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      res.status(405).json({ message: "Method Not Allowed" });
    }
    const client = await clientPromise;
    const db = client.db("deniz_pool");

    const res_order = await db
      .collection("orders")
      .find(ObjectId(req.body.orderID))
      .toArray();

    const [order] = JSON.parse(JSON.stringify(res_order));
    res.status(200).json({ ...order });
    // Send a success response
  } catch (error) {
    // Send an error response if there was an issue with the insertion
    res
      .status(500)
      .json({ message: `Error selecting document: ${error.message}` });
  }
}
