import clientPromise from "../../../lib/mongodb";
const ObjectId = require("mongodb").ObjectId;

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      // Send an error response if the request method is not POST
    }
    const client = await clientPromise;
    const db = client.db("deniz_pool");

    const box_res = await db
      .collection("boxes")
      .aggregate([
        {
          $match: { _id: ObjectId(req.body.id) },
        },
        {
          $lookup: {
            from: "uploads",
            let: { image_id: "$image_id" },
            pipeline: [
              {
                $match: {
                  $expr: { $eq: ["$_id", { $toObjectId: "$$image_id" }] },
                },
              },
            ],
            as: "imageData",
          },
        },
      ])
      .toArray();
    res.status(200).json({ boxData: JSON.parse(JSON.stringify(box_res)) });
    // Send a success response
  } catch (error) {
    // Send an error response if there was an issue with the insertion
    res
      .status(500)
      .json({ message: `Error selecting document: ${error.message}` });
  }
}
