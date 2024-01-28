import clientPromise from "../../../lib/mongodb";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("deniz_pool");

  const files = await db
    .collection("uploads")
    .find({})
    .sort({ _id: -1 })
    .toArray();

  res.status(200).json({ files: JSON.parse(JSON.stringify(files)) });
}
