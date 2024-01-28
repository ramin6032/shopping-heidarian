import clientPromise from "../../../lib/mongodb";

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      // Send an error response if the request method is not POST
      return res.status(405).json({ message: "Method not allowed" });
    }
    const client = await clientPromise;
    const db = client.db("deniz_pool");
    db.collection("categories").insertOne(req.body);
    // Send a success response
    res.status(200).json({ message: "New document inserted successfully!" });
  } catch (error) {
    // Send an error response if there was an issue with the insertion
    res
      .status(500)
      .json({ message: `Error inserting document: ${error.message}` });
  }
}
