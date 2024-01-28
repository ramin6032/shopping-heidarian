import clientPromise from "../../../lib/mongodb";
const ObjectId = require("mongodb").ObjectId;

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      res.status(500).json({ message: `error in method` });
    }
    const client = await clientPromise;
    const db = client.db("deniz_pool");

    const user_res = await db
      .collection("accounts")
      .find(ObjectId(req.body.id))
      .toArray();
    res.status(200).json({ user: JSON.parse(JSON.stringify(user_res)) });
    // Send a success response
  } catch (error) {
    // Send an error response if there was an issue with the insertion
    res
      .status(500)
      .json({ message: `Error selecting document: ${error.message}` });
  }
}
