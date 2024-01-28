import clientPromise from "../../../lib/mongodb";

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      res.status(500).json({ message: `Deny This method` });
    }
    const { page = 1, pageSize = 10 } = req.body.query;
    const skip = (page - 1) * pageSize;
    const limit = Number(pageSize);

    const client = await clientPromise;
    const db = client.db("deniz_pool");
    const query = {};

    if (req.body.name) {
      query.name = { $regex: req.body.name };
    }
    if (req.body.mobile) {
      query.mobile = { $regex: req.body.mobile };
    }
    if (req.body.status) {
      query.status = req.body.status;
    }

    const messages = await db
      .collection("messages")
      .find(query)
      .skip(skip)
      .limit(limit)
      .sort({ _id: -1 })
      .toArray();
    const total = await db.collection("messages").find(query).toArray();
    res.status(200).json({
      messages: JSON.parse(JSON.stringify(messages)),
      total: JSON.parse(JSON.stringify(total)).length,
    });
    // Send a success response
  } catch (error) {
    // Send an error response if there was an issue with the insertion
    res
      .status(500)
      .json({ message: `Error selecting document: ${error.message}` });
  }
}
