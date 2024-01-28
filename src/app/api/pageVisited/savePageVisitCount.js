// import clientPromise from "../../../lib/mongodb";
// const ObjectId = require("mongodb").ObjectId;

// export default async function handler(req, res) {
//   try {
//     if (req.method !== "POST") {
//       // Send an error response if the request method is not POST
//     }
//     const client = await clientPromise;
//     const db = client.db("deniz_pool");

//     // تاریخ امروز را بدست آورید
//     const currentDate = new Date().toISOString().split("T")[0];
//     const page = req.body.page;

//     // افزودن یک واحد به count برای تاریخ امروز
//     await db.collection("pageVisited").findOneAndUpdate(
//       { page: page }, // شرط برای یافتن رکورد با تاریخ امروز
//       { $inc: { totalVisit: 1 }, $setOnInsert: { page: page } }, // عملگر $inc برای افزایش count و $setOnInsert برای اضافه کردن تاریخ در صورت ایجاد مجدد رکورد
//       { upsert: true } // ایجاد رکورد جدید اگر تاریخ امروز پیدا نشد
//     );

//     await db.collection("analitics").findOneAndUpdate(
//       { date: currentDate, page: page }, // شرط برای یافتن رکورد با تاریخ امروز
//       {
//         $inc: { totalVisit: 1 },
//         $setOnInsert: { date: currentDate, page: page },
//       }, // عملگر $inc برای افزایش count و $setOnInsert برای اضافه کردن تاریخ در صورت ایجاد مجدد رکورد
//       { upsert: true } // ایجاد رکورد جدید اگر تاریخ امروز پیدا نشد
//     );

//     // Send a success response
//   } catch (error) {
//     // Send an error response if there was an issue with the insertion
//     res
//       .status(500)
//       .json({ message: `Error in savePageVisitCount: ${error.message}` });
//   }
// }
