import clientPromise from "../../../lib/mongodb";

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      res.status(500).json({ message: `error in method` });
    }
    const client = await clientPromise;
    const db = client.db("deniz_pool");

    const category_res = await db
      .collection("categories")
      .find({ $or: [{ name: req.body.name }, { label: req.body.label }] })
      .toArray();

    res
      .status(200)
      .json({ category: JSON.parse(JSON.stringify(category_res)) });
    // Send a success response
  } catch (error) {
    // Send an error response if there was an issue with the insertion
    res
      .status(500)
      .json({ message: `Error selecting document: ${error.message}` });
  }
}
