import clientPromise from "../../../lib/mongodb";

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ message: "Method not allowed" });
    }
    const client = await clientPromise;
    const db = client.db("deniz_pool");
    db.collection("gallery").insertOne(req.body);
    res.status(200).json({ message: "تصویر جدید اضافه شد" });
  } catch (error) {
    res
      .status(500)
      .json({ message: `خطا در اضافه کردن تصویر: ${error.message}` });
  }
}
