import clientPromise from "../../../lib/mongodb";

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      // Send an error response if the request method is not POST
      return res.status(405).json({ message: "Method not allowed" });
    }
    const client = await clientPromise;
    const db = client.db("deniz_pool");

    const users = await db
      .collection("accounts")
      .find({})
      .sort({ _id: -1 })
      .toArray();
    const total = await db.collection("accounts").countDocuments();

    res.status(200).json({ users: JSON.parse(JSON.stringify(users)), total });
    // Send a success response
  } catch (error) {
    // Send an error response if there was an issue with the insertion
    res
      .status(500)
      .json({ message: `Error selecting users: ${error.message}` });
  }
}
