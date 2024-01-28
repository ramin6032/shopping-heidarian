import nextConnect from "next-connect";
import multer from "multer";
import path from "path";
import clientPromise from "../../../lib/mongodb";
import sharp from "sharp";

const AWS = require("aws-sdk");

const s3 = new AWS.S3({
  endpoint: process.env.LIARA_ENDPOINT,
  accessKeyId: process.env.LIARA_ACCESS_KEY,
  secretAccessKey: process.env.LIARA_SECRET_KEY,
});

const upload = multer({
  storage: multer.diskStorage({
    // destination: `${process.env.LIARA_BUCKET_NAME}/uploads`,
    filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
  }),
});

const apiRoute = nextConnect({
  onError(error, req, res) {
    res
      .status(501)
      .json({ error: `Sorry something Happened! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

apiRoute.use(upload.single("file"));

apiRoute.post(async (req, res) => {
  let isImage = true;
  const outputFile = `${path.basename(req.file.path)}`;
  const outputKey = `uploads/${outputFile}`;
  const data = await sharp(req.file.path).toBuffer();
  await s3
    .upload({
      Bucket: process.env.LIARA_BUCKET_NAME,
      Key: outputKey,
      Body: data,
    })
    .promise();

  if (req.file.mimetype === "image/jpeg" || req.file.mimetype === "image/png") {
    convertToSmallImage(req.file.path);
  } else {
    isImage = false;
  }

  const client = await clientPromise;
  const db = client.db("deniz_pool");
  const fileData = {
    type: req.file.mimetype,
    size: req.file.size,
    url: `https://denizpool.storage.iran.liara.space/uploads/${req.file.filename}`,
    name: req.file.originalname,
    thumbUrl: isImage
      ? `https://denizpool.storage.iran.liara.space/uploads/thumb_${req.file.filename}`
      : null,
  };

  try {
    db.collection("uploads").insertOne(fileData);
    res.status(200).json({
      status: true,
      message: "فایل با موفقیت آپلود شد",
      fileData,
    });
  } catch (error) {
    res.status(500).json({ message: `خطای درج در دیتابیس: ${error.message}` });
  }
});

export default apiRoute;

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};

const convertToSmallImage = async (inputFile) => {
  // Resize options
  const resizeOptions = {
    width: 250, // New width in pixels
    fit: "cover", // How to fit the image within the given dimensions
    position: "center", // Where to position the image within the new dimensions
  };

  const outputFile = `thumb_${path.basename(inputFile)}`;
  const outputKey = `uploads/${outputFile}`;

  try {
    const data = await sharp(inputFile).resize(resizeOptions).toBuffer();
    await s3
      .upload({
        Bucket: process.env.LIARA_BUCKET_NAME,
        Key: outputKey,
        Body: data,
      })
      .promise();

    console.log("Image resized successfully");
  } catch (error) {
    console.error(error);
  }
};
