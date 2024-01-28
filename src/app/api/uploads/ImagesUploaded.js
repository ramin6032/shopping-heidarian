import clientPromise from "../../../lib/mongodb";

export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db("deniz_pool");
    const files = await db
      .collection("uploads")
      .find({ type: { $in: ["image/jpeg", "image/png", "image/webp"] } })
      .sort({ _id: -1 })
      .toArray();

    // Send a success response
    res.status(200).json({ imageList: JSON.parse(JSON.stringify(files)) });
  } catch (error) {
    // Send an error response if there was an issue with the insertion
    res
      .status(500)
      .json({ message: `Error inserting document: ${error.message}` });
  }
}
