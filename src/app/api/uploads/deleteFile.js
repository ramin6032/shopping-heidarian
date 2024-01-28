import clientPromise from "../../../lib/mongodb";

const AWS = require("aws-sdk");
const ObjectId = require("mongodb").ObjectId;

const s3 = new AWS.S3({
  endpoint: process.env.LIARA_ENDPOINT,
  accessKeyId: process.env.LIARA_ACCESS_KEY,
  secretAccessKey: process.env.LIARA_SECRET_KEY,
});

export default async function handler(req, res) {
  const urlIndex = req.body.url.indexOf("upload"); // Replace with actual file path
  let url;
  if (urlIndex !== -1) {
    url = req.body.url.slice(urlIndex);
    console.log(url);
  }

  const thumbUrlIndex = req.body.thumbUrl.indexOf("upload");
  let thumbUrl;
  if (thumbUrlIndex !== -1) {
    thumbUrl = req.body.thumbUrl.slice(thumbUrlIndex);
  }

  console.log(req.body);
  const client = await clientPromise;
  const db = client.db("deniz_pool");
  const query = { _id: ObjectId(req.body._id) };
  try {
    if (url) {
      const params = {
        Bucket: process.env.LIARA_BUCKET_NAME,
        Key: url, // replace with the actual object key of the file
      };

      // Delete the file from the bucket
      s3.deleteObject(params, function (err, data) {
        if (err) throw err;
        console.log("File deleted successfully");
      });
    }

    if (thumbUrl) {
      const params = {
        Bucket: process.env.LIARA_BUCKET_NAME,
        Key: thumbUrl, // replace with the actual object key of the file
      };

      // Delete the file from the bucket
      s3.deleteObject(params, function (err, data) {
        if (err) throw err;
        console.log("File deleted successfully");
      });
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
