import clientPromise from "../../../lib/mongodb";

export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db("deniz_pool");

    const boxList = await db
      .collection("boxes")
      .find({})
      .sort({ type: 1, index: 1 })
      .toArray();

    res.status(200).json({ boxList: JSON.parse(JSON.stringify(boxList)) });
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error selecting document: ${error.message}` });
  }
}
