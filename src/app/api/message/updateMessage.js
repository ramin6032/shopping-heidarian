import clientPromise from "../../../lib/mongodb";
const ObjectId = require("mongodb").ObjectId;

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      res.status(405).json({ message: "Method Not Allowed" });
    }
    const client = await clientPromise;
    const db = client.db("deniz_pool");

    const query = { _id: ObjectId(req.body.id) };

    db.collection("messages").updateOne(
      query,
      {
        $set: {
          status: "seen",
          seenDate: Date.now(),
        },
      },
      function (err, result) {
        if (err) throw err;
        const message = "به روزرسانی انجام شد";
        res.status(200).json({ message, status: true });
      }
    );

    // Send a success response
  } catch (error) {
    // Send an error response if there was an issue with the insertion
    res
      .status(500)
      .json({ message: `Error removing document: ${error.message}` });
  }
}
