import clientPromise from "../../../lib/mongodb";
const ObjectId = require("mongodb").ObjectId;

export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db("deniz_pool");

    const query = { _id: ObjectId(req.body.id) };
    db.collection("boxes").deleteOne(query, function (err, result) {
      if (err) throw err;
      const message = "حذف باکس انجام شد";
      res.status(200).json({ message, status: true });
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error removing document: ${error.message}` });
  }
}
