import fs from "fs";
import clientPromise from "../../../lib/mongodb";
const ObjectId = require("mongodb").ObjectId;

export default async function handler(req, res) {
  const url = `./public${req.body.url}`; // Replace with actual file path
  const thumbUrl = `./public${req.body.thumbUrl}`;
  const client = await clientPromise;
  const db = client.db("deniz_pool");
  const query = { _id: ObjectId(req.body._id) };

  try {
    // Check if file exists
    if (url) {
      if (!fs.existsSync(url)) {
        db.collection("uploads").deleteOne(query, function (err, result) {
          if (err) throw err;
        });
        return res.status(404).json({ message: "چنین فایلی وجود ندارد" });
      }
    }

    try {
      // Delete the file
      if (url) fs.unlinkSync(url);
      if (thumbUrl) fs.unlinkSync(thumbUrl);
    } catch (error) {
      console.log(error);
    }

    db.collection("uploads").deleteOne(query, function (err, result) {
      if (err) throw err;
      return res.status(200).json({ message: "حذف فایل انجام شد" });
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "خطا در حذف فایل" });
  }
}
