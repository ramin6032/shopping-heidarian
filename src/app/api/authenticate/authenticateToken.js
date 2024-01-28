const jwt = require("jsonwebtoken");
const ObjectId = require("mongodb").ObjectId;
import clientPromise from "../../../lib/mongodb";

export default async function authenticateToken(req) {
  const cookies = req.cookies;
  const token = cookies.jwt;
  const client = await clientPromise;
  const db = client.db("deniz_pool");

  if (token) {
    try {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      const { _id } = decodedToken;
      const user = await db
        .collection("accounts")
        .find({ _id: ObjectId(_id) }, { fullname: 1, type: 1 })
        .toArray();

      if (!user.length) {
        return false;
      }

      const [userInfo] = JSON.parse(JSON.stringify(user));
      return userInfo;
    } catch (error) {
      return false;
    }
  } else {
    return false;
  }
}
