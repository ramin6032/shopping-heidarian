import clientPromise from "../../../lib/mongodb";
const ObjectId = require("mongodb").ObjectId;

export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db("deniz_pool");

    const order = await db
      .collection("orders")
      .find({ userID: req.body.id })
      .toArray();

    if (order.length) {
      res.status(200).json({
        message: "این کاربر قبلا ثبت سفارش انجام داده و قابل حذف نیست",
        status: false,
      });
      return;
    }

    const query = { _id: ObjectId(req.body.id) };
    db.collection("members").deleteOne(query, function (err, result) {
      if (err) throw err;
      const message = "حذف یوزر انجام شد";
      res.status(200).json({ message, status: true });
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error in remove member: ${error.message}` });
  }
}
