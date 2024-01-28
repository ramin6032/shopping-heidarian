import nextConnect from "next-connect";
import multer from "multer";
import path from "path";
import clientPromise from "../../../lib/mongodb";

const upload = multer({
  storage: multer.diskStorage({
    destination: "./public/uploads",
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
    url: `/uploads/${req.file.filename}`,
    name: req.file.originalname,
    thumbUrl: isImage ? `/uploads/thumb_${req.file.filename}` : null,
  };
  try {
    db.collection("uploads").insertOne(fileData);
    res
      .status(200)
      .json({ status: true, message: "فایل با موفقیت آپلود شد", fileData });
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

const convertToSmallImage = (inputFile) => {
  const sharp = require("sharp");
  // Input and output file paths
  const outputFile = `./public/uploads/thumb_${path.relative(
    "./public/uploads/",
    inputFile
  )}`;

  // Resize options
  const resizeOptions = {
    width: 120, // New width in pixels
    fit: "cover", // How to fit the image within the given dimensions
    position: "center", // Where to position the image within the new dimensions
  };

  // Read the input file, resize it, and write the output file
  sharp(inputFile)
    .resize(resizeOptions)
    .toFile(outputFile, (err) => {
      if (err) {
        console.error(err);
      } else {
        console.log("Image resized successfully");
      }
    });
};
