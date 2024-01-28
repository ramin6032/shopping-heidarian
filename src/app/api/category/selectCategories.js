import clientPromise from "../../../lib/mongodb";

export default async function handler(req, res) {
  const { page = 1, pageSize = 10 } = req.query;
  const skip = (page - 1) * pageSize;
  const limit = Number(pageSize);
  try {
    const client = await clientPromise;
    const db = client.db("deniz_pool");

    const categories = await db
      .collection("categories")
      .find({})
      .sort({ _id: -1 })
      .skip(skip)
      .limit(limit)
      .toArray();
    const total = await db.collection("categories").countDocuments();

    res
      .status(200)
      .json({ categories: JSON.parse(JSON.stringify(categories)), total });
    // Send a success response
  } catch (error) {
    // Send an error response if there was an issue with the insertion
    res
      .status(500)
      .json({ message: `Error selecting document: ${error.message}` });
  }
}
