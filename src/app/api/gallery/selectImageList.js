import clientPromise from "../../../lib/mongodb";

export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db("deniz_pool");

    const gallery = await db
      .collection("gallery")
      .find({})
      .sort({ _id: -1 })
      .toArray();

    res.status(200).json({ imageList: JSON.parse(JSON.stringify(gallery)) });
    // Send a success response
  } catch (error) {
    // Send an error response if there was an issue with the insertion
    res
      .status(500)
      .json({ message: `Error selecting document: ${error.message}` });
  }
}
