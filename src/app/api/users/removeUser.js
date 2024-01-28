import clientPromise from "../../../lib/mongodb";
const ObjectId = require("mongodb").ObjectId;

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      res.status(500).json({ message: `error in method` });
    }
    const client = await clientPromise;
    const db = client.db("deniz_pool");

    const query = { _id: ObjectId(req.body.id) };
    db.collection("accounts").deleteOne(query, function (err, result) {
      if (err) throw err;
      const message = "حذف کاربر انجام شد";
      res.status(200).json({ message, status: true });
    });

    // Send a success response
  } catch (error) {
    // Send an error response if there was an issue with the insertion
    res
      .status(500)
      .json({ message: `Error removing document: ${error.message}` });
  }
}
