import clientPromise from "../../../lib/mongodb";

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ message: "Method not allowed" });
    }
    const now = Date.now();
    const order = {
      userID: req.body.user.id,
      name: req.body.user.name,
      username: req.body.user.username,
      order: req.body.basket.stuffList,
      totalPrice: req.body.basket.totalPrice,
      contacts: {
        call: req.body.contacts.contact,
        address: req.body.contacts.address,
      },
      description: req.body.contacts.description,
      level: "new",
      orderDate: now,
      trackingNumber: now,
    };
    const client = await clientPromise;
    const db = client.db("deniz_pool");
    db.collection("orders").insertOne(order);
    // Send a success response
    res.status(200).json({
      message: "سفارش شما ثبت شد",
      status: "success",
      trackingNumber: now,
    });
  } catch (error) {
    // Send an error response if there was an issue with the insertion
    res.status(500).json({ message: `خطا در ثبت سفارش: ${error.message}` });
  }
}
