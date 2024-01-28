import clientPromise from "../../../lib/mongodb";
const ObjectId = require("mongodb").ObjectId;

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      // Send an error response if the request method is not POST
    }
    const client = await clientPromise;
    const db = client.db("deniz_pool");

    const category = await db
      .collection("products")
      .find({ category: { $in: [req.body.name] } })
      .toArray();

    if (!category.length) {
      const query = { _id: ObjectId(req.body.id) };
      db.collection("categories").deleteOne(query, function (err, result) {
        if (err) throw err;
        const message = "حذف دسته بندی انجام شد";
        res.status(200).json({ message, status: true });
      });
    } else {
      const message = "این دسته بندی در محصولات استفاده شده و قابل حذف نیست";
      res.status(200).json({ message, status: false });
    }

    // Send a success response
  } catch (error) {
    // Send an error response if there was an issue with the insertion
    res
      .status(500)
      .json({ message: `Error removing document: ${error.message}` });
  }
}
