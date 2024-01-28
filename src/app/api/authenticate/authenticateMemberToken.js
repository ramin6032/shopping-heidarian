const jwt = require("jsonwebtoken");
const ObjectId = require("mongodb").ObjectId;
import clientPromise from "../../../lib/mongodb";

export default async function authenticateMemberToken(req, res) {
  const cookies = req.cookies;
  const token = cookies.jwt;
  const client = await clientPromise;
  const db = client.db("deniz_pool");

  if (token) {
    try {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      const { _id } = decodedToken;

      const user = await db
        .collection("members")
        .find({ _id: ObjectId(_id) })
        .toArray();

      if (!user.length) {
        res.status(200).json({ message: "user not found" });
        return;
      }

      const [userInfo] = JSON.parse(JSON.stringify(user));

      // add visit count
      db.collection("members").updateOne(
        { _id: ObjectId(userInfo._id) },
        {
          $set: {
            lastVisit: Date.now(),
          },
          $inc: { visitCount: 1 },
        }
      );

      res.status(200).json({
        id: userInfo._id,
        username: userInfo.username,
        name: userInfo.name,
      });
    } catch (error) {
      if (error.message === "jwt expired") {
        res.status(200).json({ message: "jwt expired" });
        return;
      }

      res.status(500).json({ error: error });
    }
  } else {
    res.status(200).json({ message: "you have not token" });
  }
}
