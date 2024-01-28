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

    db.collection("menu").updateOne(
      query,
      {
        $set: {
          label: req.body.label,
          subMenu: req.body.subMenu,
          link: req.body.link,
          category: req.body.category,
        },
      },
      function (err, result) {
        if (err) throw err;
        const message = "به روزرسانی منو انجام شد";
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
