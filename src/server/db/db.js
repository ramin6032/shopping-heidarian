import mysql from "mysql2/promise";

export async function query(query) {
  try {
    const connection = await mysql.createConnection({
      host: process.env.MYSQL_HOST,
      port: process.env.MYSQL_PORT,
      database: process.env.MYSQL_DATABASE,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
    });

    const [result] = await connection.execute(query);

    await connection.end();

    return result;
  } catch (error) {
    console.clear();
    console.log("Error Message:", error.sqlMessage);
    console.log("sql:", error.sql);
    if (error.message.includes("Duplicate entry"))
      throw new Error("خطا: کلید تکراری وارد شده است");
    if (error.message.includes("Cannot delete or update a parent row"))
      throw new Error("خطا: به عنوان کلید خارجی در جدول دیگر استفاده شده است");
    throw new Error(error);
  }
}
