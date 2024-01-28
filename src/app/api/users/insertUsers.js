import clientPromise from "../../../lib/mongodb";
import { createHash } from "node:crypto";

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      // Send an error response if the request method is not POST
      return res.status(405).json({ message: "Method not allowed" });
    }
    const client = await clientPromise;
    const db = client.db("deniz_pool");
    db.collection("accounts").insertOne({
      ...req.body,
      type: "admin",
      password: md5(req.body.password),
    });
    // Send a success response
    res.status(200).json({ message: "New user inserted successfully!" });
  } catch (error) {
    // Send an error response if there was an issue with the insertion
    res
      .status(500)
      .json({ message: `Error inserting document: ${error.message}` });
  }
}

function md5(content) {
  return createHash("md5").update(content).digest("hex");
}
