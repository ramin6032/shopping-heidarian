import jwt from "jsonwebtoken";
import clientPromise from "../../../lib/mongodb";
import cookie from "cookie";
import { createHash } from "node:crypto";

export default async function authenticateUser(req, res) {
  const { username, password, type } = req.body;
  const client = await clientPromise;
  const db = client.db("deniz_pool");
  let id, expireTime, userInfo;
  try {
    if (type === "admin") {
      const admin = await db
        .collection("accounts")
        .find({
          username: username,
          password: md5(password),
          status: "enabled",
        })
        .toArray();
      [userInfo] = JSON.parse(JSON.stringify(admin));
      expireTime = process.env.ADMIN_EXPIRE_TIME;
    }

    if (type === "user") {
      const user = await db
        .collection("members")
        .find({ username: username, password: password })
        .toArray();
      [userInfo] = JSON.parse(JSON.stringify(user));
      expireTime = process.env.USER_EXPIRE_TIME;
    }

    if (!userInfo) {
      res.status(401).json({ message: "اطلاعات کاربری صحیح نیست" });
    } else {
      // query for update
      const query = { username: username };

      // add login count and update lastLogin for members
      if (type === "user") {
        db.collection("members").updateOne(query, {
          $set: {
            lastLogin: Date.now(),
          },
          $inc: { loginCount: 1 },
        });
      }

      // add login count and update lastLogin for admins
      if (type === "admin") {
        db.collection("accounts").updateOne(query, {
          $set: {
            lastLogin: Date.now(),
          },
          $inc: { loginCount: 1 },
        });
      }

      // generate a JWT using the 'jsonwebtoken' library
      const token = jwt.sign({ _id: userInfo._id }, process.env.JWT_SECRET, {
        expiresIn: expireTime,
      });

      // Set the JWT token as an HTTP-only cookie in the response header
      const serializedCookie = cookie.serialize("jwt", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        sameSite: "strict",
        maxAge: 3600,
        path: "/",
      });

      res.setHeader("Set-Cookie", serializedCookie);
      res.status(200).json({
        userInfo: {
          id: userInfo?._id,
          name: userInfo?.name,
          username: userInfo.username,
        },
      });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Error in authenticateUser: ${error.message}` });
  }
}

function md5(content) {
  return createHash("md5").update(content).digest("hex");
}
