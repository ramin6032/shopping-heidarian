import clientPromise from "../../../lib/mongodb";
const ObjectId = require("mongodb").ObjectId;

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      // Send an error response if the request method is not POST
    }
    const client = await clientPromise;
    const db = client.db("deniz_pool");

    const query = { _id: ObjectId(req.body._id) };
    let branch = [];
    if (req.body.branchName1) {
      branch.push({
        name: req.body.branchName1,
        call: req.body.branchTell1,
        address: req.body.branchAddress1,
      });
    }
    if (req.body.branchName2) {
      branch.push({
        name: req.body.branchName2,
        call: req.body.branchTell2,
        address: req.body.branchAddress2,
      });
    }
    if (req.body.branchName3) {
      branch.push({
        name: req.body.branchName3,
        call: req.body.branchTell3,
        address: req.body.branchAddress3,
      });
    }

    db.collection("specifications").updateOne(
      query,
      {
        $set: {
          title: req.body.title,
          descrption: req.body.descrption,
          keywords: req.body.keywords,
          homeContent: req.body.homeContent,
          username: req.body.username,
          call: req.body.call,
          address: req.body.address,
          aboutUs: req.body.aboutUs,
          Counseling: req.body.Counseling,
          branchName1: req.body.branchName1,
          branchTell1: req.body.branchTell1,
          branchAddress1: req.body.branchAddress1,
          branchName2: req.body.branchName2,
          branchTell2: req.body.branchTell2,
          branchAddress2: req.body.branchAddress2,
          branchName3: req.body.branchName3,
          branchTell3: req.body.branchTell3,
          branchAddress3: req.body.branchAddress3,
          centeralPhone: req.body.centeralPhone,
        },
      },
      function (err, result) {
        if (err) throw err;
        const message = "به روزرسانی انجام شد";
        res.status(200).json({ message, status: true });
      }
    );

    // Send a success response
  } catch (error) {
    // Send an error response if there was an issue with the insertion
    res
      .status(500)
      .json({ message: `Error updating document: ${error.message}` });
  }
}
