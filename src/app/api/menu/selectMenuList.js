import clientPromise from "../../../lib/mongodb";

export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db("deniz_pool");

    const menuList = await db
      .collection("menu")
      .find({})
      .sort({ _id: -1 })
      .toArray();

    res.status(200).json({ menuList: JSON.parse(JSON.stringify(menuList)) });
    // Send a success response
  } catch (error) {
    // Send an error response if there was an issue with the insertion
    res
      .status(500)
      .json({ message: `Error selecting document: ${error.message}` });
  }
}
