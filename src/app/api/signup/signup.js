import clientPromise from "../../../lib/mongodb";

async function handler(req, res) {
  const { name, username, password } = req.body;

  if (!name || !username || !password) {
    return res.status(400).json({ message: "مقادیر الزامی وارد نشده است" });
  }

  const client = await clientPromise;
  const db = client.db("deniz_pool");

  try {
    const members = db.collection("members");
    const member = await members.find({ username: username }).toArray();

    if (member.length) {
      return res
        .status(400)
        .json({ message: "شماره همراه وارد شده قبلا ثبت نام کرده است" });
    } else {
      const result = await members.insertOne({
        name,
        username,
        password,
        registeryDate: Date.now(),
      });

      return res.status(201).json({
        message: "Member created successfully",
        id: result.insertedId,
      });
    }
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: "خطا در ایجاد کاربر جدید", error: err });
  } finally {
    await client.close();
  }
}

export default handler;
