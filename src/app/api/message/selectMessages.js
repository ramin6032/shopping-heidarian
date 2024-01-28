import clientPromise from "../../../lib/mongodb";

export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db("deniz_pool");

    const messages = await db
      .collection("messages")
      .find({ status: "new" })
      .sort({ _id: -1 })
      .toArray();

    res.status(200).json({ imageList: JSON.parse(JSON.stringify(messages)) });
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error selecting document: ${error.message}` });
  }
}
