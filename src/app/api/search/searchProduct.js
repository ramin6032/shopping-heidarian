import clientPromise from "../../../lib/mongodb";
const ObjectId = require("mongodb").ObjectId;

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      res.status(500).json({ message: `Deny This method` });
    }
    const { page = 1, pageSize = 10 } = req.body.query;
    const skip = (page - 1) * pageSize;
    const limit = Number(pageSize);

    const client = await clientPromise;
    const db = client.db("deniz_pool");
    const query = {};
    if (req.body.Suggested) {
      query.offer = true;
    }
    if (req.body.bestSeller) {
      query.mostSale = true;
    }
    if (req.body.category) {
      query.category = { $in: [req.body.category] };
    }
    if (req.body.hasColleagueDiscount) {
      query.agentDiscount = { $exists: true };
    }
    if (req.body.hasDiscount) {
      query.discount = { $exists: true };
    }
    if (req.body.newProduct) {
      query.newLabel = true;
    }
    if (req.body.productName) {
      query.name = { $regex: req.body.productName };
    }
    if (req.body.price.min) {
      query.price = { $gte: Number(req.body.price.min) };
    }
    if (req.body.price.max) {
      query.price = { $lte: Number(req.body.price.max) };
    }

    const products = await db
      .collection("products")
      .find(query)
      .skip(skip)
      .limit(limit)
      .toArray();
    const total = await db.collection("products").find(query).toArray();
    res.status(200).json({
      products: JSON.parse(JSON.stringify(products)),
      total: JSON.parse(JSON.stringify(total)).length,
    });
    // Send a success response
  } catch (error) {
    // Send an error response if there was an issue with the insertion
    res
      .status(500)
      .json({ message: `Error selecting document: ${error.message}` });
  }
}
