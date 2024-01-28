import clientPromise from "../../../lib/mongodb";
const ObjectId = require("mongodb").ObjectId;

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      // Send an error response if the request method is not POST
    }
    const client = await clientPromise;
    const db = client.db("deniz_pool");

    const menu_res = await db
      .collection("menu")
      .find(ObjectId(req.body.id))
      .toArray();
    res.status(200).json({ menu: JSON.parse(JSON.stringify(menu_res)) });
    // Send a success response
  } catch (error) {
    // Send an error response if there was an issue with the insertion
    res
      .status(500)
      .json({ message: `Error selecting document: ${error.message}` });
  }
}
