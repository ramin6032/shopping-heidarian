import clientPromise from "../../../lib/mongodb";

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      res.status(401).json({ message: `accsess denide` });
    }
    const client = await clientPromise;
    const db = client.db("deniz_pool");

    const query = { username: req.body.username };

    db.collection("members").updateOne(
      query,
      {
        $set: {
          lastLogin: Date.now(),
        },
        $inc: { visitCount: 1 },
      },
      function (err, result) {
        if (err) throw err;
        const message = "آخرین ورود ثبت شد";
        res.status(200).json({ message, status: true });
      }
    );

    // Send a success response
  } catch (error) {
    // Send an error response if there was an issue with the insertion
    res
      .status(500)
      .json({ message: `Error in setLastLogin : ${error.message}` });
  }
}
