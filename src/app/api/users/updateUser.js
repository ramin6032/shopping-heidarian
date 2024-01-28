import clientPromise from "../../../lib/mongodb";
const ObjectId = require("mongodb").ObjectId;

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      // Send an error response if the request method is not POST
    }
    const client = await clientPromise;
    const db = client.db("deniz_pool");

    const query = { _id: ObjectId(req.body._id) };

    db.collection("accounts").updateOne(
      query,
      {
        $set: {
          username: req.body.username,
          cell: req.body.cell,
          status: req.body.status,
          name: req.body.name,
          accessibility: req.body.accessibility,
        },
      },
      function (err, result) {
        if (err) throw err;
        const message = "به روزرسانی کاربر انجام شد";
        res.status(200).json({ message, status: true });
      }
    );

    // Send a success response
  } catch (error) {
    // Send an error response if there was an issue with the insertion
    res
      .status(500)
      .json({ message: `Error Update document: ${error.message}` });
  }
}
